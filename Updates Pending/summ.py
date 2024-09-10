import re
import csv
from transformers import BartTokenizer, BartForConditionalGeneration

def load_model_and_tokenizer():
    tokenizer = BartTokenizer.from_pretrained("facebook/bart-large-cnn")
    model = BartForConditionalGeneration.from_pretrained("facebook/bart-large-cnn")
    return tokenizer, model

def preprocess_text(text):
    text = re.sub(r'[^\w\s]', '', text) 
    return text

def summarize_text(tokenizer, model, text):
    processed_text = preprocess_text(text)
    inputs = tokenizer(processed_text, return_tensors="pt", max_length=1024, truncation=True)
    summary_ids = model.generate(inputs['input_ids'], max_length=150, num_beams=4, early_stopping=True)
    summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
    return summary

def find_case_by_number(case_number, csv_file):
    with open(csv_file, newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            if row['Case No.'].strip() == case_number.strip():
                text_to_summarize = f"{row['Matter']} {row['Factual Background']} {row['Issues Presented']} {row['Plaintiff Arguments']} {row['Defendant Arguments']} {row['Relief Sought']}"
                return text_to_summarize
    return None

def main():
    tokenizer, model = load_model_and_tokenizer()
    csv_file = r"C:\Users\ertri\Downloads\Github projects\legalmind-ai\DummyCase_Data.csv"
    case_number = input("Enter the case number to summarize: ")
    text = find_case_by_number(case_number, csv_file)
    
    if text:
        print("Text to summarize:")
        print(text)
        summary = summarize_text(tokenizer, model, text)
        
        print("\nSummary:")
        print(summary)
    else:
        print("Case not found.")

if __name__ == "__main__":
    main()
