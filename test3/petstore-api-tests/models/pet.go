package models

import "fmt"

type Category struct {
	ID   int64  `json:"id,omitempty"`
	Name string `json:"name,omitempty"`
}
type Tag struct {
	ID   int64  `json:"id,omitempty"`
	Name string `json:"name,omitempty"`
}
type Pet struct {
	ID        int64     `json:"id,omitempty"`
	Category  *Category `json:"category,omitempty"`
	Name      string    `json:"name"`
	PhotoUrls []string  `json:"photoUrls"`
	Tags      []Tag     `json:"tags,omitempty"`
	Status    string    `json:"status,omitempty"`
}

type APIError struct {
	StatusCode int    `json:"-"`
	Code       int32  `json:"code"`
	Type       string `json:"type"`
	Message    string `json:"message"`
}

func (e *APIError) Error() string {
	return fmt.Sprintf("api error: %d %s - %s", e.Code, e.Type, e.Message)
}
