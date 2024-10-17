// Constructor
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

// Display Constructor
function Display() {

}

// Add methods to display prototype
Display.prototype.add = function (book) {
    console.log("Adding to UI");
    tableBody = document.getElementById('tableBody');
    let uiString = `<tr>
                        <td>${book.name}</td>
                        <td>${book.author}</td>
                        <td>${book.type}</td>
                    </tr>`;
    tableBody.innerHTML += uiString;
}

// Implement the clear function
Display.prototype.clear = function () {
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
}

// Implement the validate function
Display.prototype.validate = function (book) {
    if (book.name.length < 2 || book.author.length < 2) {
        return false
    }
    else {
        return true;
    }
}
Display.prototype.show = function (type, displayMessage) {
    let message = document.getElementById('message');
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong>Messge:</strong> ${displayMessage}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">×</span>
                            </button>
                        </div>`;
    setTimeout(function () {
        message.innerHTML = ''
    }, 2000);

}


// Add submit event listener to libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    console.log('YOu have submitted library form');
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');

    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (cooking.checked) {
        type = cooking.value;
    }

    let book = new Book(name, author, type);
    console.log(book);

    let display = new Display();

    if (display.validate(book)) {

        display.add(book);
        display.clear();
        display.show('success', 'Your book has been successfully added')
    }
    else {
        // Show error to the user
        display.show('danger', 'Sorry you cannot add this book');
    }

    e.preventDefault();
}




import json
import sys
from PIL import Image, ImageDraw

def draw_shapes(json_path, output_path):
    # Step 1: Read the JSON file
    with open(json_path, 'r') as f:
        data = json.load(f)

    # Step 2: Create a blank image (let's assume a default size like 500x500)
    img_width, img_height = 500, 500
    img = Image.new('RGB', (img_width, img_height), color='white')
    draw = ImageDraw.Draw(img)
    
    # Step 3: Loop through each shape in the JSON
    for shape in data.get('shapes', []):
        shape_type = shape.get('shape_type')
        points = shape.get('points')
        color = shape.get('shape_color', '#000000')  # Default color is black
        flag = shape.get('flag', True)  # Default flag is True

        if not flag:
            # Skip shapes where the flag is False
            continue
        
        # Step 4: Handle different shape types
        if shape_type == "rectangle":
            # For rectangles, the points should contain two points: top-left and bottom-right
            if len(points) == 2:
                top_left = points[0]
                bottom_right = points[1]
                # Ensure the coordinates are integers
                top_left = [int(coord) for coord in top_left]
                bottom_right = [int(coord) for coord in bottom_right]
                try:
                    draw.rectangle([top_left, bottom_right], outline=color, width=2)
                except ValueError as e:
                    print(f"Error drawing rectangle with points {top_left} and {bottom_right}: {e}")
        
        elif shape_type == "polygon":
            # For polygons, the points contain multiple coordinates
            if len(points) > 2:
                # Convert all points to integer coordinates
                polygon_points = [(int(p[0]), int(p[1])) for p in points]
                try:
                    draw.polygon(polygon_points, outline=color)
                except ValueError as e:
                    print(f"Error drawing polygon with points {polygon_points}: {e}")
    
    # Step 5: Save the image to the output path
    img.save(output_path)
    print(f"Image saved to {output_path}")

if __name__ == "__main__":
    # Command-line arguments: json file and output path
    if len(sys.argv) != 3:
        print("Usage: python script.py <json_file> <output_image_path>")
        sys.exit(1)

    json_file = sys.argv[1]
    output_image_path = sys.argv[2]
    
    # Call the function to draw shapes and save the image
    draw_shapes(json_file, output_image_path)





