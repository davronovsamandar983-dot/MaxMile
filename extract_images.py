import fitz  # PyMuPDF
import os

pdf_path = "/Users/davronoff/Desktop/Max mile web/PDF.pdf"
output_dir = "/Users/davronoff/Desktop/Max mile web/maxmiles-app/public/products"

os.makedirs(output_dir, exist_ok=True)

pdf_document = fitz.open(pdf_path)
image_count = 0

print(f"Total pages: {len(pdf_document)}")

for page_index in range(len(pdf_document)):
    page = pdf_document[page_index]
    image_list = page.get_images(full=True)
    
    if image_list:
        print(f"[+] Found {len(image_list)} images on page {page_index + 1}")
    else:
        print(f"[!] No images found on page {page_index + 1}")
        
    for image_index, img in enumerate(image_list, start=1):
        xref = img[0]
        base_image = pdf_document.extract_image(xref)
        image_bytes = base_image["image"]
        image_ext = base_image["ext"]
        
        # Save image
        image_name = f"page{page_index + 1}_img{image_index}.{image_ext}"
        image_path = os.path.join(output_dir, image_name)
        
        with open(image_path, "wb") as f:
            f.write(image_bytes)
            
        print(f"    Saved {image_name}")
        image_count += 1

print(f"Total images extracted: {image_count}")
