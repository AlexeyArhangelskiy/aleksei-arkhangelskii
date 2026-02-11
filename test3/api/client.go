package api

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"test3/models"
	"time"
)

type Client struct {
	BaseURL    string
	HTTPClient *http.Client
}

type ClientOption func(*Client)

func WithHTTPClient(httpClient *http.Client) ClientOption {
	return func(c *Client) {
		c.HTTPClient = httpClient
	}
}

func NewClient(baseURL string, opts ...ClientOption) *Client {
	c := &Client{
		BaseURL: baseURL,
		HTTPClient: &http.Client{
			Timeout: 10 * time.Second,
		},
	}
	for _, opt := range opts {
		opt(c)
	}
	return c
}

func (c *Client) do(ctx context.Context, method, path string, body interface{}, result interface{}) error {
	var reqBody io.Reader
	if body != nil {
		jsonBytes, err := json.Marshal(body)
		if err != nil {
			return fmt.Errorf("failed to marshal request body: %w", err)
		}
		reqBody = bytes.NewBuffer(jsonBytes)
	}

	req, err := http.NewRequestWithContext(ctx, method, c.BaseURL+path, reqBody)
	if err != nil {
		return fmt.Errorf("failed to create request: %w", err)
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Accept", "application/json")

	resp, err := c.HTTPClient.Do(req)
	if err != nil {
		return fmt.Errorf("request failed: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 300 {
		var apiErr models.APIError
		if err := json.NewDecoder(resp.Body).Decode(&apiErr); err != nil {
			return fmt.Errorf("api request failed with status %d: %s", resp.StatusCode, resp.Status)
		}
		apiErr.StatusCode = resp.StatusCode
		return &apiErr
	}

	if result != nil && resp.StatusCode != http.StatusNoContent {
		if err := json.NewDecoder(resp.Body).Decode(result); err != nil {
			return fmt.Errorf("failed to decode response: %w", err)
		}
	}

	return nil
}

func (c *Client) CreatePet(ctx context.Context, pet *models.Pet) (*models.Pet, error) {
	var result models.Pet
	if err := c.do(ctx, http.MethodPost, "/pet", pet, &result); err != nil {
		return nil, err
	}
	return &result, nil
}

func (c *Client) GetPet(ctx context.Context, petID int64) (*models.Pet, error) {
	var result models.Pet
	if err := c.do(ctx, http.MethodGet, fmt.Sprintf("/pet/%d", petID), nil, &result); err != nil {
		return nil, err
	}
	return &result, nil
}

func (c *Client) UpdatePet(ctx context.Context, pet *models.Pet) (*models.Pet, error) {
	var result models.Pet
	if err := c.do(ctx, http.MethodPut, "/pet", pet, &result); err != nil {
		return nil, err
	}
	return &result, nil
}

func (c *Client) DeletePet(ctx context.Context, petID int64) error {
	return c.do(ctx, http.MethodDelete, fmt.Sprintf("/pet/%d", petID), nil, nil)
}
