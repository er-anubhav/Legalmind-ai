from google.colab import drive
drive.mount('/content/drive')

import numpy as np
import pandas as pd
import seaborn as sns

df=pd.read_csv("/content/drive/MyDrive/DummyCase_Data.csv")

from transformers import AutoTokenizer, AutoModel
import torch
import numpy as np
import pandas as pd

def mean_pooling(model_output, attention_mask):
    token_embeddings = model_output[0]
    input_mask_expanded = attention_mask.unsqueeze(-1).expand(token_embeddings.size()).float()
    return torch.sum(token_embeddings * input_mask_expanded, 1) / torch.clamp(input_mask_expanded.sum(1), min=1e-9)

def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

def get_embeddings(sentences, model, tokenizer):
    encoded_input = tokenizer(sentences, padding=True, truncation=True, return_tensors='pt')
    with torch.no_grad():
        model_output = model(**encoded_input)
    return mean_pooling(model_output, encoded_input['attention_mask'])

tokenizer = AutoTokenizer.from_pretrained('hiiamsid/sentence_similarity_spanish_es')
model = AutoModel.from_pretrained('hiiamsid/sentence_similarity_spanish_es')

cases = df['Matter'].tolist()
case_numbers = df['Case No.'].tolist()

keywords = [
    "Breach of Contract", "Breach of Agreement", "Dispute", "Violation", "Failure to Deliver", "Unauthorized Use",
    "Misuse", "Non-Compliance", "Inadequate Performance", "Defective Products", "Delivery Issues", "Unauthorized Modifications",
    "Franchise Agreement", "Partnership Agreement", "Licensing Agreement", "Technology Licensing Agreement", "Supply Agreement",
    "Sales Agreement", "Service Agreement", "Joint Venture Agreement", "Real Estate Agreement", "Employment Contract",
    "Technology Transfer Agreement", "Intellectual Property Infringement", "Trademark Infringement", "Patent Infringement",
    "Copyright Infringement", "Misappropriation of Trade Secrets", "Proprietary Information", "Unauthorized Redistribution",
    "Confidentiality Breach", "Data Privacy Violation", "Data Protection Violation", "Unfair Competition", "Brand Misuse",
    "Unauthorized Marketing", "Unauthorized Expansion", "Misuse of Brand Name", "Financial Mismanagement", "Breach of Fiduciary Duty",
    "Real Estate Dispute", "Construction Delays", "Misrepresentation", "Property Mismanagement", "Development Agreement",
    "Lease Agreement"
]

print("Available Keywords:")
for i, keyword in enumerate(keywords, 1):
    print(f"{i}. {keyword}")

input_method = input("Would you like to input keywords by 'number' or 'name'?: ").strip().lower()

if input_method == 'number':
    selected_indices = input("Enter the numbers of selected keywords, separated by commas (e.g., 1, 5, 12): ")
    selected_indices = [int(i.strip()) - 1 for i in selected_indices.split(',')]
    selected_keywords = [keywords[i] for i in selected_indices]

elif input_method == 'name':
    selected_keywords = input("Enter the selected keywords, separated by commas (e.g., Brand Misuse, Unfair Competition): ")
    selected_keywords = [keyword.strip() for keyword in selected_keywords.split(',')]
    invalid_keywords = [keyword for keyword in selected_keywords if keyword not in keywords]
    if invalid_keywords:
        print(f"Invalid keywords found: {invalid_keywords}. Please try again.")
        exit()

else:
    print("Invalid input method. Please choose 'number' or 'name'.")
    exit()

selected_embeddings = get_embeddings(selected_keywords, model, tokenizer).numpy()
case_embeddings = get_embeddings(cases, model, tokenizer).numpy()

similarity_scores = []
for case_embedding in case_embeddings:
    avg_similarity = np.mean([cosine_similarity(keyword_embedding, case_embedding) for keyword_embedding in selected_embeddings])
    similarity_scores.append(avg_similarity)

top_k_indices = np.argsort(similarity_scores)[-5:][::-1]

print("\nTop 5 Most Similar Cases:")
for idx, case_index in enumerate(top_k_indices):
    case_no = case_numbers[case_index]
    case_matter = cases[case_index]
    print(f"Case {idx + 1}: (Case No. {case_no}) {case_matter}")
