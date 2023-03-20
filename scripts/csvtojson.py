import csv
import json
import os
import re

def remove_leading_zeros(value):
    if isinstance(value, str):
        return re.sub(r'\b0+(\d)', r'\1', value)
    return value

def convert_csv_to_json(file_name, json_file_name):
    data = []
    with open(file_name, encoding="utf-8") as csvfile:
        csvreader = csv.DictReader(csvfile)

        for row in csvreader:
            row = {k: remove_leading_zeros(v) for k, v in row.items()}
            data.append(row)

    with open(json_file_name, "w", encoding="utf-8") as jsonfile:
        json.dump(data, jsonfile, ensure_ascii=False, indent=4)

csv_file_name = input("Enter the CSV file name: ")
json_file_name = input("Enter the JSON file name: ")

convert_csv_to_json(csv_file_name, json_file_name)

print(f"Converted {csv_file_name} to {json_file_name}")



"""
# Only work for enemy.csv

import pandas as pd
import json

try:
    # Prompt the user to input the filename
    filename = input("Enter the filename (including .csv extension): ")

    # Read the csv file
    data = pd.read_csv(filename)

    # Convert to json format
    json_data = json.loads(data.to_json(orient='records'))

    # Write to a json file with the same name as the input file
    output_filename = filename.replace('.csv', '.json')
    with open(output_filename, 'w') as f:
        json.dump(json_data, f)

    print(f"File {filename} converted to {output_filename}.")

except Exception as e:
    print(f"An error occurred: {str(e)}")

"""