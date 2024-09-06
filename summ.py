import re
import csv
from transformers import BartTokenizer, BartForConditionalGeneration

def load_model_and_tokenizer():
    # Load the tokenizer and model
    tokenizer = BartTokenizer.from_pretrained("facebook/bart-large-cnn")
    model = BartForConditionalGeneration.from_pretrained("facebook/bart-large-cnn")
    return tokenizer, model

def preprocess_text(text):
    # Remove special characters like *, #, etc.
    text = re.sub(r'[^\w\s]', '', text)  # Remove all special characters
    return text

def summarize_text(tokenizer, model, text):
    # Preprocess the text
    processed_text = preprocess_text(text)
    
    # Tokenize the input text
    inputs = tokenizer(processed_text, return_tensors="pt", max_length=1024, truncation=True)
    
    # Generate the summary
    summary_ids = model.generate(inputs['input_ids'], max_length=150, num_beams=4, early_stopping=True)
    
    # Decode the summary
    summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
    return summary

def find_case_by_number(case_number, csv_file):
    # Read the CSV file and search for the case number
    with open(csv_file, newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            if row['Case No.'].strip() == case_number.strip():
                # Combine relevant fields to summarize
                text_to_summarize = f"{row['Matter']} {row['Factual Background']} {row['Issues Presented']} {row['Plaintiff Arguments']} {row['Defendant Arguments']} {row['Relief Sought']}"
                return text_to_summarize
    return None

def main():
    # Load model and tokenizer
    tokenizer, model = load_model_and_tokenizer()
    
    # Define the CSV file path
    csv_file = r"C:\Users\ertri\Downloads\Github projects\legalmind-ai\DummyCase_Data.csv"
    
    # Get case number input
    case_number = input("Enter the case number to summarize: ")
    
    # Find the case by number in the CSV file
    text = find_case_by_number(case_number, csv_file)
    
    if text:
        print("Text to summarize:")
        print(text)
        
        # Summarize the text
        summary = summarize_text(tokenizer, model, text)
        
        print("\nSummary:")
        print(summary)
    else:
        print("Case not found.")

if __name__ == "__main__":
    main()
