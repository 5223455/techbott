import os
import re

directory = 'c:\\Users\\saket\\Downloads\\public_html (5)'

# Exclude 25w and already having TIJ
pattern1 = re.compile(r'Hx-Ultro(?!\s*25w|25W|-25w|\s*TIJ| TIJ)', re.IGNORECASE)
pattern2 = re.compile(r'Hx Ultro(?!\s*25w|25W|-25w|\s*TIJ| TIJ)', re.IGNORECASE)

# We also need to be careful with image paths like `Hx-Ultro.jpg` or `hx ultro.png`.
# Let's not touch image paths, so we use negative lookbehind for / or \ and negative lookahead for .jpg .png .svg
# Actually, the user says "Change the name to HX also to hx ultro tij as the name of the printer in entire website"
# Wait, "also to hx ultro tij". This might literally mean the text on the UI.
# Let's replace ONLY text nodes in HTML or just replace outside of tags?
# Doing a naive string replace might break URLs: <img src="img/Hx-Ultro.jpg"> -> <img src="img/Hx Ultro TIJ.jpg"> which breaks the image.
# It's better to specifically replace text that is NOT inside an HTML tag or attribute.

def replace_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    # Split by tags to avoid replacing attributes like src="Hx-Ultro.jpg"
    parts = re.split(r'(<[^>]+>)', content)
    changed = False
    
    for i in range(len(parts)):
        # Only process text nodes (even index in split result)
        if i % 2 == 0:
            part = parts[i]
            # avoid replacing in JS strings if they are paths? It's fine for display names.
            # But in HTML, even indices are text nodes.
            new_part = pattern1.sub('Hx Ultro TIJ', part)
            new_part = pattern2.sub('Hx Ultro TIJ', new_part)
            if new_part != part:
                parts[i] = new_part
                changed = True

    if changed:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(''.join(parts))
        print(f"Updated {filepath}")

for root, _, files in os.walk(directory):
    for file in files:
        if file.endswith(('.html', '.js')):
            replace_in_file(os.path.join(root, file))

# We should also handle Mavya chatbot JS file specially, as it contains JS objects.
