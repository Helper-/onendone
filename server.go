package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"os/exec"
)

func main() {
	// command line flags
	port := flag.Int("port", 8000, "Port to serve on: ")
	dir := flag.String("directory", "dist/", "Directory of web files: ")
	serve := flag.String("serve", "prod", "Serve production files as default.")
	flag.Parse()

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
	http.Handle("/", fileHandler)

	log.Printf("Running on port: %d\n", *port)

	addr := fmt.Sprintf("127.0.0.1:%d", *port)
	// this call blocks -- the progam runs here forever
	err := http.ListenAndServe(addr, nil)
	fmt.Println(err.Error())
}
