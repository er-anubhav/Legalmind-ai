import os
import csv
import re

folder_path = 'C:/Users/ertri/Downloads/Github projects/legalmind-ai/Dummy-Cases'
output_csv = 'case_data.csv'

# Define headers
headers = [
    'Case No.', 'Judge', 'Date of Final Hearing', 'Matter', 'Plaintiff', 'Plaintiff Legal Rep',
    'Defendant', 'Defendant Legal Rep', 'Agreement Terms', 'Alleged Breach', 
    'Misappropriation Details', 'Issues', 'Plaintiff Arguments', 'Defendant Arguments', 
    'Judgment Reserved', 'Relief Sought'
]

# Function to extract data from a case file
def extract_case_data(text):
    case_data = {header: '' for header in headers}

    case_data['Case No.'] = re.search(r'Case No\.: (.+)', text).group(1).strip() if re.search(r'Case No\.: (.+)', text) else ''
    case_data['Judge'] = re.search(r'Judge: (.+)', text).group(1).strip() if re.search(r'Judge: (.+)', text) else ''
    case_data['Date of Final Hearing'] = re.search(r'Date of Final Hearing: (.+)', text).group(1).strip() if re.search(r'Date of Final Hearing: (.+)', text) else ''
    case_data['Matter'] = re.search(r'Matter: (.+)', text).group(1).strip() if re.search(r'Matter: (.+)', text) else ''
    
    # Extract Plaintiff and Defendant details
    case_data['Plaintiff'] = re.search(r'Plaintiff:\s*(.+)', text).group(1).strip() if re.search(r'Plaintiff:\s*(.+)', text) else ''
    case_data['Plaintiff Legal Rep'] = re.search(r'Represented by:\s*(.+)', text).group(1).strip() if re.search(r'Represented by:\s*(.+)', text) else ''
    case_data['Defendant'] = re.search(r'Defendant:\s*(.+)', text).group(1).strip() if re.search(r'Defendant:\s*(.+)', text) else ''
    case_data['Defendant Legal Rep'] = re.search(r'Represented by:\s*(.+)', text, re.MULTILINE).group(1).strip() if re.search(r'Represented by:\s*(.+)', text, re.MULTILINE) else ''

    # Extract optional sections (if they exist)
    case_data['Agreement Terms'] = re.search(r'The (.+) Agreement:', text).group(1).strip() if re.search(r'The (.+) Agreement:', text) else ''
    case_data['Alleged Breach'] = re.search(r'Alleged Breach:\s*(.+)', text).group(1).strip() if re.search(r'Alleged Breach:\s*(.+)', text) else ''
    case_data['Misappropriation Details'] = re.search(r'Misappropriation Details:\s*(.+)', text).group(1).strip() if re.search(r'Misappropriation Details:\s*(.+)', text) else ''
    
    case_data['Issues'] = re.search(r'ISSUES PRESENTED\s*(.+)', text).group(1).strip() if re.search(r'ISSUES PRESENTED\s*(.+)', text) else ''
    case_data['Plaintiff Arguments'] = re.search(r'Plaintiff\'s Arguments:\s*(.+)', text).group(1).strip() if re.search(r'Plaintiff\'s Arguments:\s*(.+)', text) else ''
    case_data['Defendant Arguments'] = re.search(r'Defendant\'s Arguments:\s*(.+)', text).group(1).strip() if re.search(r'Defendant\'s Arguments:\s*(.+)', text) else ''
    case_data['Judgment Reserved'] = re.search(r'Judgment Reserved:\s*(.+)', text).group(1).strip() if re.search(r'Judgment Reserved:\s*(.+)', text) else ''
    
    # Extract and combine relief sought
    reliefs = re.findall(r'Relief\S*[:\s]*(.+)', text)
    case_data['Relief Sought'] = " | ".join(reliefs) if reliefs else ''

    return case_data

# Process all text files in the folder
with open(output_csv, 'w', newline='', encoding='utf-8') as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=headers)
    writer.writeheader()
    
    for filename in os.listdir(folder_path):
        if filename.endswith('.txt'):
            with open(os.path.join(folder_path, filename), 'r', encoding='utf-8') as file:
                text = file.read()
                case_data = extract_case_data(text)
                writer.writerow(case_data)

print(f'Data has been extracted and saved to {output_csv}')
