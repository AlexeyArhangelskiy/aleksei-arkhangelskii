package tests

import (
	"errors"
	"net/http"
	"testing"

	"petstore-api-tests/models"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func AssertAPIError(t *testing.T, err error, expectedStatus int) {
	t.Helper()
	require.Error(t, err)

	var apiErr *models.APIError
	if errors.As(err, &apiErr) {
		assert.Equal(t, expectedStatus, apiErr.StatusCode)
	} else {
		assert.Contains(t, err.Error(), http.StatusText(expectedStatus))
	}
}
