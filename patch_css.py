import os

files_to_patch = [
    'c:\\Users\\saket\\Downloads\\public_html (5)\\pages\\technology\\MapleJet.html',
    'c:\\Users\\saket\\Downloads\\public_html (5)\\pages\\technology\\Leibinger.html'
]

old_card = """        .product-showcase-card {
            background: #fff;
            border-radius: 16px;
            overflow: hidden;
            border: 1px solid rgba(30,96,170,0.1);
            transition: all 0.4s cubic-bezier(0.25,0.46,0.45,0.94);
            height: 100%;
        }"""
        
new_card = """        .product-showcase-card {
            background: #fff;
            border-radius: 16px;
            overflow: hidden;
            border: 1px solid rgba(30,96,170,0.1);
            transition: all 0.4s cubic-bezier(0.25,0.46,0.45,0.94);
            height: 100%;
            display: flex;
            flex-direction: column;
        }"""

old_wrapper = """        .product-showcase-card .card-img-wrapper {
            position: relative;
            padding: 40px;
            background: #f8faff;
            text-align: center;
            overflow: hidden;
        }"""
        
new_wrapper = """        .product-showcase-card .card-img-wrapper {
            position: relative;
            padding: 40px;
            background: #f8faff;
            text-align: center;
            overflow: hidden;
            flex: 0 0 300px;
            display: flex;
            align-items: center;
            justify-content: center;
        }"""

old_body = """        .product-showcase-card .card-body {
            padding: 30px;
            text-align: center;
        }"""

new_body = """        .product-showcase-card .card-body {
            padding: 30px;
            text-align: center;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
        }
        .product-showcase-card .btn-view {
            margin-top: auto;
        }"""

# Wait, btn-view is already defined later in the CSS. I should just update the .card-body and then add margin-top: auto; to the .btn-view definition or just here.
# Let's see how .btn-view is defined.

for file_path in files_to_patch:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    content = content.replace(old_card, new_card)
    content = content.replace(old_wrapper, new_wrapper)
    
    # We can replace old_body and append margin-top: auto; to btn-view
    content = content.replace(old_body, """        .product-showcase-card .card-body {
            padding: 30px;
            text-align: center;
            flex: 1;
            display: flex;
            flex-direction: column;
        }""")
        
    old_btn = """        .product-showcase-card .btn-view {
            display: inline-block;"""
    new_btn = """        .product-showcase-card .btn-view {
            display: inline-block;
            margin-top: auto;"""
    content = content.replace(old_btn, new_btn)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Patched {file_path}")
