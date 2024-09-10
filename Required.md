## Setting Up the Python Environment

To set up the Python environment for the `legalmind-ai` project, follow these steps:

### Prerequisites

- Python 3.8 or later
- `pip` (Python package installer)

### Creating a Virtual Environment

1. **Create a virtual environment:**

   Using `venv`:
   ```sh
   python -m venv env
   ```

   Or using `virtualenv`:
   ```sh
   virtualenv env
   ```

2. **Activate the virtual environment:**

   On Windows:
   ```sh
   .\env\Scripts\activate
   ```

   On macOS and Linux:
   ```sh
   source env/bin/activate
   ```

### Installing Packages

Once the virtual environment is activated, install the required packages using `pip`:

```sh
pip install blinker==1.8.2 certifi==2024.8.30 charset-normalizer==3.3.2 click==8.1.7 colorama==0.4.6 filelock==3.16.0 Flask==3.0.3 fsspec==2024.9.0 huggingface-hub==0.24.6 idna==3.8 itsdangerous==2.2.0 Jinja2==3.1.4 MarkupSafe==2.1.5 mpmath==1.3.0 networkx==3.3 numpy==2.1.1 packaging==24.1 PyYAML==6.0.2 regex==2024.7.24 requests==2.32.3 safetensors==0.4.5 setuptools==74.1.2 sympy==1.13.2 tokenizers==0.19.1 torch==2.4.1 tqdm==4.66.5 transformers==4.44.2 typing_extensions==4.12.2 urllib3==2.2.2 Werkzeug==3.0.4
```

### List of Required Packages

Here is the list of packages and their versions that need to be installed:

| Package            | Version   |
|--------------------|-----------|
| blinker            | 1.8.2     |
| certifi            | 2024.8.30 |
| charset-normalizer | 3.3.2     |
| click              | 8.1.7     |
| colorama           | 0.4.6     |
| filelock           | 3.16.0    |
| Flask              | 3.0.3     |
| fsspec             | 2024.9.0  |
| huggingface-hub    | 0.24.6    |
| idna               | 3.8       |
| itsdangerous       | 2.2.0     |
| Jinja2             | 3.1.4     |
| MarkupSafe         | 2.1.5     |
| mpmath             | 1.3.0     |
| networkx           | 3.3       |
| numpy              | 2.1.1     |
| packaging          | 24.1      |
| pip                | 24.2      |
| PyYAML             | 6.0.2     |
| regex              | 2024.7.24 |
| requests           | 2.32.3    |
| safetensors        | 0.4.5     |
| setuptools         | 74.1.2    |
| sympy              | 1.13.2    |
| tokenizers         | 0.19.1    |
| torch              | 2.4.1     |
| tqdm               | 4.66.5    |
| transformers       | 4.44.2    |
| typing_extensions  | 4.12.2    |
| urllib3            | 2.2.2     |
| Werkzeug           | 3.0.4     |

### Deactivating the Virtual Environment

Once you are done working, you can deactivate the virtual environment by running:

```sh
deactivate
```