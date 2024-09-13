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

print("Please enter keywords related to the case")
user_input = input()
selected_keywords = [keyword.strip() for keyword in user_input.split(',')]

selected_embeddings = get_embeddings(selected_keywords, model, tokenizer).numpy()
case_embeddings = get_embeddings(cases, model, tokenizer).numpy()

similarity_scores = []
for case_embedding in case_embeddings:
    avg_similarity = np.mean([cosine_similarity(keyword_embedding, case_embedding) for keyword_embedding in selected_embeddings])
    similarity_scores.append(avg_similarity)

if len(similarity_scores) == 0 or max(similarity_scores) < 0.1:
    print("No similar cases found.")
else:
    top_k_indices = np.argsort(similarity_scores)[-5:][::-1]

    print("\nTop 5 Most Similar Cases:")
    for idx, case_index in enumerate(top_k_indices):
        case_no = case_numbers[case_index]
        case_matter = cases[case_index]
        print(f"Case {idx + 1}: (Case No. {case_no}) {case_matter}")