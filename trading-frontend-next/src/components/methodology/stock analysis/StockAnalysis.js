import { useState, useRef, useEffect } from "react";

const StockAnalysis = () => {
  const [images, setImages] = useState([]);
  const [displayCount, setDisplayCount] = useState(4);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Calculate available display count options based on number of images
  const availableDisplayCounts = [2, 4, 6, 8, 10, 12].filter(
    (num) => num <= Math.max(images.length, 2)
  );

  // Convert file to base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Load images from localStorage on component mount
  useEffect(() => {
    const savedImages = localStorage.getItem("stockChartImages");
    if (savedImages) {
      try {
        const parsedImages = JSON.parse(savedImages);
        setImages(parsedImages);
      } catch (error) {
        console.error("Failed to parse saved images:", error);
      }
    }
  }, []);

  // Save images to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("stockChartImages", JSON.stringify(images));
  }, [images]);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setIsUploading(true);

    try {
      const newImages = await Promise.all(
        files.map(async (file) => {
          const base64 = await fileToBase64(file);
          return {
            id: Math.random().toString(36).substring(2, 9),
            base64,
            uploadedAt: new Date().toISOString(),
            name: file.name,
            size: file.size,
            type: file.type,
          };
        })
      );

      setImages((prevImages) => [...prevImages, ...newImages]);

      // Auto-adjust display count when adding new images
      if (images.length + newImages.length < displayCount) {
        setDisplayCount(images.length + newImages.length);
      }
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    if (imageFiles.length > 0) {
      await handleImageUpload({ target: { files: imageFiles } });
    }
  };

  const handleRemoveImage = (id) => {
    setImages((prevImages) => prevImages.filter((img) => img.id !== id));
  };

  const handleDisplayCountChange = (e) => {
    setDisplayCount(parseInt(e.target.value));
  };

  const displayedImages = images.slice(0, displayCount);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            Stock Chart Gallery
          </h1>
          <p className="text-lg text-gray-600">
            Upload and view your stock charts
          </p>
        </div>

        {/* Upload Area */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mb-8">
          <div
            className={`border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors ${
              isUploading ? "opacity-70" : ""
            }`}
            onClick={() => !isUploading && fileInputRef.current.click()}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center space-y-2">
              {isUploading ? (
                <div className="w-12 h-12 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              )}
              <p className="text-gray-600 font-medium">
                {isUploading
                  ? "Uploading..."
                  : "Upload stock charts (candlestick, line, bar)"}
              </p>
              <p className="text-gray-500 text-sm">
                Supports JPG, PNG (Max 5MB each)
              </p>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
              multiple
              accept="image/*"
              disabled={isUploading}
            />
          </div>
        </div>

        {/* Gallery */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2 sm:mb-0">
              Uploaded Charts
            </h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <label
                  htmlFor="displayCount"
                  className="mr-2 text-sm font-medium text-gray-700"
                >
                  Show:
                </label>
                <select
                  id="displayCount"
                  value={displayCount}
                  onChange={handleDisplayCountChange}
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                  disabled={availableDisplayCounts.length <= 1 || isUploading}
                >
                  {availableDisplayCounts.map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
              <span className="text-sm text-gray-500">
                {images.length} {images.length === 1 ? "chart" : "charts"}{" "}
                uploaded
              </span>
            </div>
          </div>

          {images.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">
                {isUploading
                  ? "Processing your images..."
                  : "No charts uploaded yet"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {displayedImages.map((image) => (
                <div
                  key={image.id}
                  className="relative rounded-lg overflow-hidden border-2 border-gray-200 bg-white shadow-sm"
                >
                  {/* Image container */}
                  <div className="relative h-96 w-full">
                    <img
                      src={image.base64}
                      alt={`Stock chart ${image.name || image.id}`}
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  </div>

                  {/* Image info */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white text-sm truncate">
                      {image.name || "Untitled chart"}
                    </p>
                    <p className="text-white/80 text-xs">
                      {new Date(image.uploadedAt).toLocaleString()} •{" "}
                      {(image.size / 1024).toFixed(1)} KB
                    </p>
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={() => handleRemoveImage(image.id)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-red-500 text-white hover:bg-red-600"
                    disabled={isUploading}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockAnalysis;
