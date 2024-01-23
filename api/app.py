from flask import Flask, jsonify, request, send_from_directory
from openai import OpenAI
from dotenv import load_dotenv
import os
import lib.leonardo, lib.download
from flask_cors import CORS

app = Flask(__name__)
CORS(app, cors_allowed_origins=['http://localhost:3000'])

load_dotenv()
openai_key = os.getenv("openai_key")
leonardo_token = os.getenv("leonardo_token")
client = OpenAI(api_key=openai_key)
print(f"Bearer {leonardo_token}")

UPLOAD_FOLDER = './static'  # Replace with your upload folder path
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


# @app.route('/api/blog-generate', methods = ['POST'])
# def blog_generate():
#     print('blog-generate')
#     prompt = ""
#     run = client.beta.threads.create_and_run(
#         assistant_id="asst_a96Xkrj84wvRb7dARe7W4KMP",
#         thread={
#             "messages": [
#             {"role": "user", "content": "Explain deep learning to a 5 year old."}
#             ]
#         }
#     )

#     return 'success'
    
# API endpoint
# @app.route('/api/data', methods=['GET'])
# def get_data():
#     return jsonify(data)

@app.route('/api/image/leonardo', methods = ['POST'])
def leonardo_generator():
    print("---------Leonardo!!!----------")
    prompt = request.form.get('prompt')
    negative_prompt = request.form.get('negative_prompt')
    model_id = request.form.get('model_id')
    photoReal = request.form.get('photoReal')
    photoRealStrength = request.form.get('photoRealStrength')
    height = request.form.get('height')
    width = request.form.get('width')
    presetStyle = request.form.get('presetStyle')
    isInit_Image = False

    print("prompt----------->", prompt) 
    

    if isInit_Image ==True:
        init_image = request.form.get('init_image')
        image_url = lib.leonardo.leonardo_init_image(leonardo_token, prompt, negative_prompt, photoRealStrength, height, width, presetStyle, init_image)
    else:
        image_url = lib.leonardo.leonardo_image(leonardo_token, prompt, negative_prompt, model_id, photoReal, photoRealStrength, height, width, presetStyle)
    
    # download the image file in static folder
    # lib.download.download_image(image_url)
    file_name = lib.download.download_image(image_url)
    server_img_url = f"http://localhost:5000/files/{file_name}"

    return jsonify({'result': server_img_url})



@app.route('/files/<path:filename>')
def serve_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)


if __name__ == '__main__':
    print("Flask backend server is running!")
    app.run()