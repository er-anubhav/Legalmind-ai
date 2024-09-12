from flask import Flask, request, jsonify, send_from_directory
import re
import csv
from transformers import BartTokenizer, BartForConditionalGeneration
import os

app = Flask(__name__, static_folder='legalmindai-software/build', static_url_path='')

# Load the model and tokenizer at the start
tokenizer, model = BartTokenizer.from_pretrained("facebook/bart-large-cnn"), BartForConditionalGeneration.from_pretrained("facebook/bart-large-cnn")

def preprocess_text(text):
    text = re.sub(r'[^\w\s]', '', text)
    return text

def summarize_text(text):
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
                text_to_summarize = f"{row['Matter']} {row['Alleged Breach']} {row['Issues']} {row['Plaintiff Arguments']} {row['Defendant Arguments']} {row['Relief Sought']}"
                return text_to_summarize, row
    return None, None

@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/api/summarize', methods=['POST'])
def summarize():
    data = request.json
    case_number = data.get('case_number')
    
    csv_file = "DummyCase_Data.csv"
    
    text, case_details = find_case_by_number(case_number, csv_file)
    
    if text:
        summary = summarize_text(text)
        return jsonify({
            "summary": summary,
            "caseDetails": {
                "caseNumber": case_details['Case No.'],
                "parties": f"{case_details['Plaintiff']} vs. {case_details['Defendant']}",
                "judge": case_details['Judge'],
                "dateOfFinalHearing": case_details['Date of Final Hearing'],
                "matter": case_details['Matter'],
                "plaintiffLegalRep": case_details['Plaintiff Legal Rep'],
                "defendantLegalRep": case_details['Defendant Legal Rep'],
                "agreementTerms": case_details['Agreement Terms'],
                "allegedBreach": case_details['Alleged Breach'],
                "issues": case_details['Issues'],
                "plaintiffArguments": case_details['Plaintiff Arguments'],
                "defendantArguments": case_details['Defendant Arguments'],
                "reliefSought": case_details['Relief Sought']
            }
        })
    else:
        return jsonify({"error": "Case not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)