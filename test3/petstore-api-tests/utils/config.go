package utils

import "os"

func GetBaseURL() string {
	if url := os.Getenv("BASE_URL"); url != "" {
		return url
	}
	return "https://petstore.swagger.io/v2"
}
