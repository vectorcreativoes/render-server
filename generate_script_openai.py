
import openai
import os

# Configura tu clave de API de OpenAI (puedes usar os.environ o directamente el string)
openai.api_key = os.getenv("OPENAI_API_KEY")

# Prompt para generar el guión del vídeo
prompt = "Crea un breve guión de 2 frases para un vídeo de TikTok sobre productividad personal."

response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "user", "content": prompt}
    ],
    max_tokens=200,
    temperature=0.7
)

# Extrae el contenido generado
script_text = response['choices'][0]['message']['content']

# Guarda el texto en un archivo local
output_dir = "generated-content"
os.makedirs(output_dir, exist_ok=True)

with open(os.path.join(output_dir, "script.txt"), "w", encoding="utf-8") as f:
    f.write(script_text)

print("Script generado y guardado en: generated-content/script.txt")
