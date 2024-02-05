#!/bin/bash

aws s3 sync ./s3-static-website/ s3://food-recommender.nosocial.net/
