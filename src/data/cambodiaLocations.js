export const cambodiaProvinces = [
  {
    id: 'phnom-penh',
    nameEn: 'Phnom Penh',
    nameKh: 'រាជធានីភ្នំពេញ',
    districts: [
      { id: 'chamkar-mon', nameEn: 'Chamkar Mon', nameKh: 'ចំការមន', communes: ['Tonle Bassac', 'Tuol Tumpung 1', 'Tuol Tumpung 2', 'Boeng Trabaek'] },
      { id: 'doun-penh', nameEn: 'Doun Penh', nameKh: 'ដូនពេញ', communes: ['Phsar Thmei 1', 'Phsar Thmei 2', 'Phsar Kandal 1', 'Chey Chumneas', 'Voat Phnum'] },
      { id: 'prampir-meakkakra', nameEn: 'Prampir Meakkakra', nameKh: '៧មករា', communes: ['Mittapheap', 'Veal Vong', 'Ou Ruessei 1', 'Monourom'] },
      { id: 'tuol-kouk', nameEn: 'Tuol Kouk', nameKh: 'ទួលគោក', communes: ['Boeng Kak 1', 'Boeng Kak 2', 'Phsar Depo 1', 'Tuek L\'ak 1'] },
      { id: 'boeng-keng-kang', nameEn: 'Boeng Keng Kang', nameKh: 'បឹងកេងកង', communes: ['Boeng Keng Kang 1', 'Boeng Keng Kang 2', 'Boeng Keng Kang 3', 'Olympic'] },
      { id: 'chbar-ampov', nameEn: 'Chbar Ampov', nameKh: 'ច្បារអំពៅ', communes: ['Chbar Ampov 1', 'Chbar Ampov 2', 'Niroth', 'Preaek Pra'] },
      { id: 'sen-sok', nameEn: 'Sen Sok', nameKh: 'សែនសុខ', communes: ['Phnom Penh Thmei', 'Tuek Thla', 'Khmuonh', 'Krang Thnong'] },
      { id: 'russey-keo', nameEn: 'Russey Keo', nameKh: 'ឫស្សីកែវ', communes: ['Svay Pak', 'Kilomaetr Lekh Prammuoy', 'Ruessei Kaev', 'Toul Sangke'] },
      { id: 'mean-chey', nameEn: 'Mean Chey', nameKh: 'មានជ័យ', communes: ['Stueng Mean Chey 1', 'Stueng Mean Chey 2', 'Chak Angrae Leu', 'Chak Angrae Kraom'] },
    ]
  },
  {
    id: 'siem-reap',
    nameEn: 'Siem Reap',
    nameKh: 'សៀមរាប',
    districts: [
      { id: 'siem-reap-city', nameEn: 'Siem Reap Municipality', nameKh: 'ក្រុងសៀមរាប', communes: ['Svay Dangkum', 'Sala Kamreuk', 'Kouk Chak', 'Nokor Thum'] },
      { id: 'prasat-bakong', nameEn: 'Prasat Bakong', nameKh: 'ប្រាសាទបាគង', communes: ['Ampil', 'Bakong', 'Ballangk'] },
      { id: 'banteay-srei', nameEn: 'Banteay Srei', nameKh: 'បន្ទាយស្រី', communes: ['Khna Sanday', 'Preah Dak', 'Run Ta Aek'] }
    ]
  },
  {
    id: 'battambang',
    nameEn: 'Battambang',
    nameKh: 'បាត់ដំបង',
    districts: [
      { id: 'battambang-city', nameEn: 'Battambang Municipality', nameKh: 'ក្រុងបាត់ដំបង', communes: ['Svay Pao', 'Rattanak', 'Chamkar Samraong', 'Prek Preah Sdach'] },
      { id: 'banan', nameEn: 'Banan', nameKh: 'បាណន់', communes: ['Kanteu 1', 'Kanteu 2', 'Phnum Sampov'] }
    ]
  },
  {
    id: 'kandal',
    nameEn: 'Kandal',
    nameKh: 'កណ្តាល',
    districts: [
      { id: 'ta-khmau', nameEn: 'Ta Khmau Municipality', nameKh: 'ក្រុងតាខ្មៅ', communes: ['Ta Khmau', 'Prek Ruessei', 'Prek Ho', 'Kampong Samnanh'] },
      { id: 'mukh-kampul', nameEn: 'Mukh Kampul', nameKh: 'មុខកំពូល', communes: ['Preaek Anchanh', 'Preaek Dambang', 'Roka Kaong'] }
    ]
  },
  {
    id: 'preah-sihanouk',
    nameEn: 'Preah Sihanouk',
    nameKh: 'ព្រះសីហនុ',
    districts: [
      { id: 'sihanoukville', nameEn: 'Sihanoukville Municipality', nameKh: 'ក្រុងព្រះសីហនុ', communes: ['Sangkat 1', 'Sangkat 2', 'Sangkat 3', 'Sangkat 4'] },
      { id: 'koh-rong', nameEn: 'Koh Rong', nameKh: 'ក្រុងកោះរ៉ុង', communes: ['Koh Rong', 'Koh Rong Sanloem'] }
    ]
  },
  {
    id: 'kampot',
    nameEn: 'Kampot',
    nameKh: 'កំពត',
    districts: [
      { id: 'kampot-city', nameEn: 'Kampot Municipality', nameKh: 'ក្រុងកំពត', communes: ['Kampong Bay', 'Kampong Kandal', 'Krang Ampil', 'Andoung Khmer'] },
      { id: 'teuk-chhou', nameEn: 'Tuek Chhou', nameKh: 'ទឹកឈូ', communes: ['Chum Kriel', 'Trapeang Sangkae', 'Prek Tnoat'] }
    ]
  }
];

export const productCategories = [
  { id: 1, nameEn: 'Electronics / Tech', nameKh: 'អេឡិចត្រូនិច និង បច្ចេកវិទ្យា', icon: '💻' },
  { id: 2, nameEn: 'Cambodian Specialties', nameKh: 'ផលិតផលខ្មែរពិសេសៗ', icon: '🇰🇭' },
  { id: 3, nameEn: 'Household Essentials', nameKh: 'សម្ភារៈប្រើប្រាស់ក្នុងផ្ទះ', icon: '🏠' },
  { id: 4, nameEn: 'Baby & Kids', nameKh: 'ទារក និង កុមារ', icon: '👶' },
  { id: 5, nameEn: 'Fashion & Beauty', nameKh: 'ម៉ូដ និង សម្ផស្ស', icon: '👗' },
  { id: 6, nameEn: 'Grocery & Farm Products', nameKh: 'គ្រឿងទេស និង កសិផល', icon: '🥑' },
  { id: 7, nameEn: 'New Releases', nameKh: 'ផលិតផលចេញថ្មី', icon: '✨' },
  { id: 8, nameEn: 'Stationery & Souvenirs', nameKh: 'សម្ភារៈការិយាល័យ និង វត្ថុអនុស្សាវរីយ៍', icon: '🎁' },
  { id: 9, nameEn: 'Official Brands', nameKh: 'ម៉ាកយីហោផ្លូវការ', icon: '🏷️' },
  { id: 10, nameEn: 'Sports & Recreational', nameKh: 'កីឡា និង ការកម្សាន្ត', icon: '⚽' },
];
