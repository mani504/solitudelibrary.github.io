Here’s a sample README file that explains how to run your script, including the necessary instructions and details:

---

# Text Inpainting using Keras OCR and OpenCV

This script detects and removes text from images by inpainting the text regions using Keras OCR for text detection and OpenCV for the inpainting process. It processes images in a specified input directory and saves the inpainted images to an output directory.

## Features

- Uses Keras OCR to detect text in images.
- Applies inpainting to remove detected text regions from images.
- Batch processing of multiple images in the specified input directory.
- Saves inpainted images to the specified output directory.

## Prerequisites

1. **Python 3.x**: Ensure Python is installed on your machine.
2. **Required Python Packages**:
   - OpenCV (`cv2`)
   - NumPy
   - Keras OCR

You can install the required packages using `pip`:

```bash
pip install opencv-python numpy keras-ocr
```

## Usage

### Running the Script

To run the script, follow these steps:

1. **Clone or download the script** into your working directory.

2. **Prepare input images**:
   - Place all images you want to process in a folder, e.g., `input`.

3. **Run the script** from the command line by specifying the input and output directories.

   ```bash
   python <script_name.py> <input_directory> <output_directory>
   ```

   Replace `<script_name.py>` with the name of the script, `<input_directory>` with the folder containing your input images, and `<output_directory>` with the folder where you want the processed images to be saved.

### Example:

If your images are in the `input` folder and you want the results saved in the `outputTess` folder:

```bash
python text_inpainting.py input outputTess
```

### Input and Output:

- **Input Directory**: Contains images in supported formats (`.png`, `.jpg`, `.jpeg`).
- **Output Directory**: The inpainted images will be saved in this folder, retaining their original filenames.

### Notes:

- The script processes all images in the input directory in **batch** mode for optimal performance.
- The `keras-ocr` pipeline is initialized only once for efficiency.

## Example Workflow

1. Place your input images inside the `input` folder.
2. Run the script as shown above.
3. The inpainted images will be saved in the `outputTess` folder.

## Script Overview

- **`inpaint_text_by_character(img, predictions)`**: Detects text bounding boxes and creates a mask to inpaint those regions.
- **`process_images(input_dir, output_dir, pipeline)`**: Processes all images in the input directory, detects text, applies inpainting, and saves the output.
- **`main()`**: Initializes the Keras OCR pipeline and processes the images in batch mode.

---

This README should make it clear how to use your script and what it does. You can adjust it to fit your specific needs or environment further.
