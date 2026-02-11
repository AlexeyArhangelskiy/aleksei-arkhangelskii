package utils

import (
	"test3/models"
)

func CreateRandomPet() *models.Pet {
	return &models.Pet{
		ID:   RandomID(),
		Name: "Pet_" + RandomString(8),
		Category: &models.Category{
			ID:   RandomID(),
			Name: "Category_" + RandomString(5),
		},
		PhotoUrls: []string{"http://example.com/photo1"},
		Tags: []models.Tag{
			{ID: RandomID(), Name: "Tag_" + RandomString(5)},
		},
		Status: "available",
	}
}
