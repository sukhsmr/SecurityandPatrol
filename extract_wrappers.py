import re
with open('../index.html', 'r', encoding='utf-8') as f:
    text = f.read()

start = text.find('<main')
end = text.find('<section', start)
print(text[start:end])
