import re

css_path = 'c:\\Users\\saket\\Downloads\\public_html (5)\\css\\mavya-chatbot.css'
js_path = 'c:\\Users\\saket\\Downloads\\public_html (5)\\js\\mavya-chatbot.js'

with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

# 1. Restore Colors to Orange Theme
css = css.replace('#2d69cc', '#ea5100')
css = css.replace('rgba(45, 105, 204, 0.4)', 'rgba(234, 81, 0, 0.4)')
css = css.replace('background: #ea5100;', 'background: linear-gradient(135deg, #ea5100 0%, #ef803a 100%);')

# 2. Restore Positions & Dimensions
css = css.replace('bottom: 30px;\n    right: 30px;', 'bottom: 225px;\n    right: 22px;')
css = css.replace('bottom: 110px;\n    right: 30px;', 'bottom: 295px;\n    right: 28px;')
css = css.replace('width: 360px;', 'width: 480px;')
css = css.replace('height: 600px;', 'height: 650px;')

# 3. Restore Send Button CSS (Remove display: none)
css = css.replace('#mavya-send {\n    background: none;\n    border: none;\n    color: #2d69cc;\n    cursor: pointer;\n    display: none;\n}',
"""#mavya-send {
    background: #ea5100;
    border: none;
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
}
#mavya-send svg {
    width: 16px;
    height: 16px;
}""")

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(css)


with open(js_path, 'r', encoding='utf-8', errors='ignore') as f:
    js = f.read()

# 1. Fix Broken Characters (Cross mark and Emoji)
js = re.sub(r'<button class="mavya-back-btn" title="Close chat">.*?</button>', '<button class="mavya-back-btn" title="Close chat" style="font-size: 1.8rem;">✕</button>', js)
js = re.sub(r'data-q="[^"]* AI Product Recommendation"', 'data-q="✨ AI Product Recommendation"', js)
js = re.sub(r'>[^<]* AI Product Recommendation</button>', '>✨ AI Product Recommendation</button>', js)

# 2. Add Send button SVG back to form
form_old = """                <form id="mavya-form" autocomplete="off">
                    <input type="text" id="mavya-input" placeholder="Type your message and hit 'Submit'" maxlength="300" autocomplete="off">
                </form>"""
form_new = """                <form id="mavya-form" autocomplete="off">
                    <input type="text" id="mavya-input" placeholder="Type a message..." maxlength="300" autocomplete="off">
                    <button type="submit" id="mavya-send" title="Send">
                        <svg viewBox="0 0 24 24" fill="white"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                    </button>
                </form>"""
js = js.replace(form_old, form_new)

with open(js_path, 'w', encoding='utf-8') as f:
    f.write(js)

print("Restored Orange Theme, Large Dimensions, and Send Button!")
