package tests

import (
	"context"
	"net/http"
	"testing"

	"test3/api"
	"test3/utils"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func setup() *api.Client {
	return api.NewClient(utils.GetBaseURL())
}

func TestCreatePet(t *testing.T) {
	t.Parallel()
	client := setup()
	pet := utils.CreateRandomPet()
	ctx := context.Background()

	createdPet, err := client.CreatePet(ctx, pet)
	require.NoError(t, err)

	t.Cleanup(func() {
		_ = client.DeletePet(context.Background(), createdPet.ID)
	})

	assert.Equal(t, pet.ID, createdPet.ID)
	assert.Equal(t, pet.Name, createdPet.Name)
	assert.Equal(t, pet.Status, createdPet.Status)
}

func TestGetPet(t *testing.T) {
	t.Parallel()
	client := setup()
	pet := utils.CreateRandomPet()
	ctx := context.Background()

	createdPet, err := client.CreatePet(ctx, pet)
	require.NoError(t, err)

	t.Cleanup(func() {
		_ = client.DeletePet(context.Background(), createdPet.ID)
	})

	fetchedPet, err := client.GetPet(ctx, pet.ID)
	require.NoError(t, err)

	assert.Equal(t, pet.ID, fetchedPet.ID)
	assert.Equal(t, pet.Name, fetchedPet.Name)
}

func TestUpdatePet(t *testing.T) {
	t.Parallel()
	client := setup()
	pet := utils.CreateRandomPet()
	ctx := context.Background()

	createdPet, err := client.CreatePet(ctx, pet)
	require.NoError(t, err)

	t.Cleanup(func() {
		_ = client.DeletePet(context.Background(), createdPet.ID)
	})

	pet.Name = "Updated_" + pet.Name
	pet.Status = "sold"
	updatedPet, err := client.UpdatePet(ctx, pet)
	require.NoError(t, err)

	assert.Equal(t, pet.Name, updatedPet.Name)
	assert.Equal(t, "sold", updatedPet.Status)

	fetchedPet, err := client.GetPet(ctx, pet.ID)
	require.NoError(t, err)
	assert.Equal(t, pet.Name, fetchedPet.Name)
}

func TestDeletePet(t *testing.T) {
	t.Parallel()
	client := setup()
	pet := utils.CreateRandomPet()
	ctx := context.Background()

	_, err := client.CreatePet(ctx, pet)
	require.NoError(t, err)

	err = client.DeletePet(ctx, pet.ID)
	require.NoError(t, err)

	_, err = client.GetPet(ctx, pet.ID)
	require.Error(t, err)

	AssertAPIError(t, err, http.StatusNotFound)
}

func TestGetPet_NotFound(t *testing.T) {
	t.Parallel()
	client := setup()
	ctx := context.Background()
	const largeIDOffset = 900000000
	nonExistentID := utils.RandomID() + largeIDOffset

	_, err := client.GetPet(ctx, nonExistentID)
	require.Error(t, err)

	AssertAPIError(t, err, http.StatusNotFound)
}

func TestDeletePet_NotFound(t *testing.T) {
	t.Parallel()
	client := setup()
	ctx := context.Background()
	const largeIDOffset = 900000000
	nonExistentID := utils.RandomID() + largeIDOffset

	err := client.DeletePet(ctx, nonExistentID)
	require.Error(t, err)
	AssertAPIError(t, err, http.StatusNotFound)
}

func TestGetPet_NegativeID(t *testing.T) {
	t.Parallel()
	client := setup()
	ctx := context.Background()
	const negativeID = -1

	_, err := client.GetPet(ctx, negativeID)
	require.Error(t, err)
}
