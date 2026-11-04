#!/usr/bin/env python3
"""Recalcula os hashes dos scripts inline do index.html e atualiza a CSP
(meta do index.html, vercel.json, _headers e .htaccess).
Rode sempre que editar o <script> do index.html:  python3 atualizar-csp.py"""
import re, hashlib, base64, pathlib
raiz = pathlib.Path(__file__).parent
html = (raiz/'index.html').read_text(encoding='utf-8')
hs = ' '.join("'sha256-"+base64.b64encode(hashlib.sha256(s.encode()).digest()).decode()+"'"
              for s in re.findall(r'<script>(.*?)</script>', html, flags=re.S))
novo = f"script-src 'self' {hs};"
for nome in ['index.html','vercel.json','_headers','.htaccess']:
    f = raiz/nome
    if f.exists():
        t = f.read_text(encoding='utf-8')
        f.write_text(re.sub(r"script-src 'self'[^;]*;", novo, t), encoding='utf-8')
print('CSP atualizada:', hs)
