#!/bin/bash

# Get the current directory where JSON files are stored
DATA_DIR="."

# Loop through all JSON files in the current directory
for file in "$DATA_DIR"/*.json; do
    # Get only the filename without path
    filename=$(basename "$file")

    # Determine the folder name based on filename prefix
    folder=""
    if [[ $filename == _home.json ]]; then
        folder="home"
    elif [[ $filename == _anime_* ]]; then
        folder="anime"
    elif [[ $filename == _character_character_* ]]; then
        folder="character"
    elif [[ $filename == _characters_* ]]; then
        folder="characters"
    elif [[ $filename == _episodes_* ]]; then
        folder="episodes"
    elif [[ $filename == _servers_* ]]; then
        folder="servers"
    elif [[ $filename == _stream_* ]]; then
        folder="stream"
    elif [[ $filename == _search_* ]]; then
        folder="search"
    elif [[ $filename == _suggestion_* ]]; then
        folder="suggestion"
    elif [[ $filename == _animes_top-airing_* ]]; then
        folder="animes/top-airing"
    elif [[ $filename == _animes_most-popular_* ]]; then
        folder="animes/most-popular"
    elif [[ $filename == _animes_most-favorite_* ]]; then
        folder="animes/most-favorite"
    else
        folder="misc"
    fi

    # Create folder if it doesn't exist
    mkdir -p "$folder"

    # Move the file
    mv "$file" "$folder/"
done

echo "✅ All files organized into folders!"
