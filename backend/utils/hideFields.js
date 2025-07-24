/**
 * Ẩn các trường nhạy cảm trong object (document hoặc plain object)
 * @param {Object} doc - Mongoose Document hoặc Object JS
 * @param {Array} fields - Các trường cần ẩn (vd: ['MatKhau'])
 * @returns {Object} Object mới không chứa các trường cần ẩn
 */
function hideFields(doc, fields = []) {
  const plain = doc.toObject ? doc.toObject() : { ...doc };

  fields.forEach((field) => {
    delete plain[field];
  });

  return plain;
}

module.exports = hideFields;
