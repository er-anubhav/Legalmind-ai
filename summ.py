pip install transformers

import re
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

def main():
    tokenizer, model = load_model_and_tokenizer()
    
    print("Enter the legal document text (press Enter twice to finish):")
    input_text = ""
    
    while True:
        line = input()
        if line.strip() == '':
            # Process and summarize when a blank line is entered
            if input_text.strip():  # Ensure there is text to process
                summary = summarize_text(tokenizer, model, input_text)
                print("\nSummary:")
                print(summary)
                input_text = ""  # Clear the text for new input
            else:
                print("No text to summarize.")
        else:
            input_text += line + "\n"

if __name__ == "__main__":
    main()
