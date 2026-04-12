export const PRODUCT_TYPES = [
    { value: 'TOP', label: 'Top / Áo trên', desc: 'Áo thun, áo sơ mi, áo len...' },
    { value: 'BOTTOM', label: 'Bottom / Quần', desc: 'Quần jeans, quần tây, quần short...' },
    { value: 'DRESS', label: 'Dress / Váy', desc: 'Váy liền, đầm, jumpsuit...' },
    { value: 'OUTERWEAR', label: 'Outerwear / Áo ngoài', desc: 'Áo khoác, blazer, coat...' },
];

export const GENDERS = [
    { value: 'MALE', label: 'Nam' },
    { value: 'FEMALE', label: 'Nữ' },
    { value: 'UNISEX', label: 'Unisex' },
];

export const MEASUREMENTS_CONFIG = {
    TOP: [
        { key: 'chestWidth', label: 'Rộng ngực', unit: 'cm', placeholder: '50' },
        { key: 'shoulderWidth', label: 'Rộng vai', unit: 'cm', placeholder: '42' },
        { key: 'waistWidth', label: 'Rộng eo', unit: 'cm', placeholder: '46' },
        { key: 'sleeveLength', label: 'Dài tay', unit: 'cm', placeholder: '60' },
        { key: 'bodyLength', label: 'Dài thân', unit: 'cm', placeholder: '70' },
    ],
    OUTERWEAR: [
        { key: 'chestWidth', label: 'Rộng ngực', unit: 'cm', placeholder: '54' },
        { key: 'shoulderWidth', label: 'Rộng vai', unit: 'cm', placeholder: '44' },
        { key: 'waistWidth', label: 'Rộng eo', unit: 'cm', placeholder: '50' },
        { key: 'sleeveLength', label: 'Dài tay', unit: 'cm', placeholder: '62' },
        { key: 'bodyLength', label: 'Dài thân', unit: 'cm', placeholder: '75' },
    ],
    BOTTOM: [
        { key: 'waistWidth', label: 'Rộng cạp', unit: 'cm', placeholder: '38' },
        { key: 'hipWidth', label: 'Rộng hông', unit: 'cm', placeholder: '48' },
        { key: 'thighWidth', label: 'Rộng bắp đùi', unit: 'cm', placeholder: '30' },
        { key: 'inseam', label: 'Dài đáy', unit: 'cm', placeholder: '75' },
        { key: 'bodyLength', label: 'Dài quần', unit: 'cm', placeholder: '100' },
    ],
    DRESS: [
        { key: 'shoulderWidth', label: 'Rộng vai', unit: 'cm', placeholder: '38' },
        { key: 'chestWidth', label: 'Rộng ngực', unit: 'cm', placeholder: '46' },
        { key: 'waistWidth', label: 'Rộng eo', unit: 'cm', placeholder: '40' },
        { key: 'hipWidth', label: 'Rộng hông', unit: 'cm', placeholder: '50' },
        { key: 'bodyLength', label: 'Dài thân', unit: 'cm', placeholder: '90' },
    ],
};

export const SIZE_PRESETS = {
    clothes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    pants: ['28', '29', '30', '31', '32', '34'],
    custom: [],
};

export const PRESET_COLORS = [
    { name: 'Đen', hex: '#111111' },
    { name: 'Trắng', hex: '#F5F5F5' },
    { name: 'Xám', hex: '#9CA3AF' },
    { name: 'Navy', hex: '#1E3A5F' },
    { name: 'Be', hex: '#D4B896' },
    { name: 'Xanh lá', hex: '#4A7C59' },
];

export const makeEmptyMeasurements = () => ({
    chestWidth: '', shoulderWidth: '', waistWidth: '',
    hipWidth: '', sleeveLength: '', bodyLength: '',
    thighWidth: '', inseam: '',
});

export const makeVariant = (size = '', colorName = '', colorHex = '#111111') => ({
    _key: Math.random().toString(36).slice(2),
    id: null,
    size,
    colorName,
    colorHex,
    stock: 0,
    measurements: makeEmptyMeasurements(),
});

export const buildInitialForm = (product) => {
    if (!product) {
        return {
            name: '', productType: '', gender: '', categoryId: '',
            price: '', description: '', imageUrls: '',
            featured: false, colors: [], sizes: [], variants: [],
        };
    }
    const variants = (product.variants || []).map(v => ({
        _key: Math.random().toString(36).slice(2),
        id: v.id,
        size: v.size || '',
        colorName: v.colorName || '',
        colorHex: v.colorHex || '#111111',
        stock: v.stock || 0,
        measurements: {
            chestWidth: v.measurements?.chestWidth ?? '',
            shoulderWidth: v.measurements?.shoulderWidth ?? '',
            waistWidth: v.measurements?.waistWidth ?? '',
            hipWidth: v.measurements?.hipWidth ?? '',
            sleeveLength: v.measurements?.sleeveLength ?? '',
            bodyLength: v.measurements?.bodyLength ?? '',
            thighWidth: v.measurements?.thighWidth ?? '',
            inseam: v.measurements?.inseam ?? '',
        },
    }));
    return {
        name: product.name || '',
        productType: product.productType || '',
        gender: product.gender || '',
        categoryId: product.categoryId || '',
        price: product.price ?? '',
        description: product.description || '',
        imageUrls: Array.isArray(product.imageUrls) ? product.imageUrls.join(', ') : (product.imageUrls || ''),
        featured: product.featured || false,
        colors: product.colors || [],
        sizes: product.sizes || [],
        variants,
    };
};