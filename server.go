package main

import (
	"context"
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os/exec"
	"time"

	"github.com/gorilla/mux"
	"github.com/kr/pretty"
	"googlemaps.github.io/maps"
)

func main() {
	// command line flags
	port := flag.Int("port", 8000, "Port to serve on: ")
	dir := flag.String("directory", "dist/", "Directory of web files: ")
	serve := flag.String("serve", "prod", "Serve production files as default.")
	flag.Parse()

	// If the serve flag is prod it will start npm
	if *serve == "prod" {
		cmd := exec.Command("npm", "start-prod")
		err := cmd.Start()
		if err != nil {
			log.Fatal(err)
		}
		log.Printf("Waiting for command to finish...")
		err = cmd.Wait()
		log.Printf("Command finished with error: %v", err)
	}

	// handle all requests by serving a file of the same name
	fs := http.Dir(*dir)
	fileHandler := http.FileServer(fs)

	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/query",
		func(w http.ResponseWriter, r *http.Request) { getRestaurant(w, r) })
	router.PathPrefix("/").Handler(fileHandler)

	log.Printf("Running on port: %d\n", *port)

	addr := fmt.Sprintf("127.0.0.1:%d", *port)
	err := http.ListenAndServe(addr, router)
	fmt.Println(err.Error())
}

func getRestaurant(w http.ResponseWriter, r *http.Request) {
	t0 := time.Now()
	vars := mux.Vars(r)

	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(http.StatusOK)

	client, err := maps.NewClient(maps.WithAPIKey("AIzaSyD1ia8_Hp8z6AzBF_5E17ik7a_P0mZ0Voo"))
	if err != nil {
		log.Fatalf("fatal error: %s", err)
	}

	var tempLatLng map[string]float64

	decoder := json.NewDecoder(r.Body)
	err = decoder.Decode(&tempLatLng)

	fmt.Println(tempLatLng["lng"])

	tempMapLatLong := maps.LatLng{
		Lat: tempLatLng["lat"],
		Lng: tempLatLng["lng"],
	}

	dirRequest := maps.NearbySearchRequest{
		Location: &tempMapLatLong,
		OpenNow:  true,
		RankBy:   "distance",
		Keyword:  "burgers",
		Type:     "restaurant",
	}

	// resp, _, err := client.Directions(context.Background(), dirRequest)
	// if err != nil {
	// 	log.Fatalf("fatal error: %s", err)
	// }

	resp, err := client.NearbySearch(context.Background(), &dirRequest)
	if err != nil {
		log.Fatalf("fatal error: %s", err)
	}

	pretty.Println(vars["location"])
	// pretty.Println(client)
	pretty.Println(resp)

	log.Printf("Search took %s", time.Since(t0))
	err = json.NewEncoder(w).Encode(resp)
	if err != nil {
		panic(err)
	}
}
