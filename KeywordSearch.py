import numpy as np
import pandas as pd
import seaborn as sns

from google.colab import drive
drive.mount('/content/drive')

df=pd.read_csv("/content/drive/MyDrive/DummyCase_Data.csv")

import re
def cleanData(txt):
    cleanText = re.sub('http\S+\s', ' ', txt)
    cleanText = re.sub('RT|cc', ' ', cleanText)
    cleanText = re.sub('#\S+\s', ' ', cleanText)
    cleanText = re.sub('@\S+', '  ', cleanText)
    cleanText = re.sub('[%s]' % re.escape("""!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"""), ' ', cleanText)
    cleanText = re.sub(r'[^\x00-\x7f]', ' ', cleanText)
    cleanText = re.sub('\s+', ' ', cleanText)
    return cleanText

pip install -U sentence-transformers

import pandas as pd
from sentence_transformers import SentenceTransformer, util
keywords = input('Enter the domain you are looking for in the case matter: ')
keywords_list = [keyword.strip().lower() for keyword in keywords.split(',')]
def contains_keywords(content, keywords):
    return any(keyword in content.lower() for keyword in keywords)
shortlisted_cases = df[df['Matter'].apply(lambda x: contains_keywords(x, keywords_list))]
if len(shortlisted_cases) == 0:
    print("No case is found with the given keyword.")
else:
    print("Shortlisted cases based on the keywords:")
    print(shortlisted_cases)
    model = SentenceTransformer('sentence-transformers/distilbert-multilingual-nli-stsb-quora-ranking')
    source_sentence = input("Please provide a source sentence for similarity comparison: ")
    source_embedding = model.encode(source_sentence)
    shortlisted_cases['Similarity Score'] = shortlisted_cases['Matter'].apply(
        lambda x: util.pytorch_cos_sim(source_embedding, model.encode(x)).item()
    )
    ranked_cases = shortlisted_cases.sort_values(by='Similarity Score', ascending=False)
    top_3_cases = ranked_cases.head(3)

    print("\nTop 3 cases based on similarity scores:")
    print(top_3_cases[['Similarity Score', 'Case No.', 'Matter']])