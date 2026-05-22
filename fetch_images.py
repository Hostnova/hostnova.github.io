import urllib.request
import json
import os

queries = {
    "bsl4_lab_real.jpg": "BSL-4",
    "dna_helix_real.jpg": "DNA double helix 3D",
    "carbon_nanotube_real.jpg": "Carbon nanotube",
    "crispr_real.jpg": "CRISPR",
    "virus_real.jpg": "Virus 3D",
    "biodefense_real.jpg": "Biodefense"
}

def fetch_image(filename, query):
    url = f"https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch={urllib.parse.quote(query)}&gsrnamespace=6&gsrlimit=1&prop=imageinfo&iiprop=url&format=json"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            pages = data.get('query', {}).get('pages', {})
            for page_id, page_info in pages.items():
                if 'imageinfo' in page_info:
                    image_url = page_info['imageinfo'][0]['url']
                    print(f"Downloading {image_url} to {filename}")
                    urllib.request.urlretrieve(image_url, filename)
                    return True
    except Exception as e:
        print(f"Error fetching {query}: {e}")
    return False

for filename, query in queries.items():
    fetch_image(filename, query)
