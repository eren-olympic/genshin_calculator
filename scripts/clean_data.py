import json
import re

def remove_leading_zeros(value):
    if isinstance(value, str):
        return re.sub(r'\b0+(\d)', r'\1', value)
    return value

def clean_json_data(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as file:
        data = json.load(file)

    cleaned_data = []
    for item in data:
        cleaned_item = {}
        for key, value in item.items():
            cleaned_value = remove_leading_zeros(value)
            if key == "reward_item" and isinstance(cleaned_value, str):
                cleaned_value = [int(x) for x in cleaned_value[1:-1].split(",")]
            cleaned_item[key] = cleaned_value
        cleaned_data.append(cleaned_item)

    with open(output_file, 'w', encoding='utf-8') as outfile:
        json.dump(cleaned_data, outfile, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    clean_json_data('enemy.json', 'enemy2.json')
