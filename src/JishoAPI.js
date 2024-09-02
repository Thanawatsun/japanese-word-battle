import axios from 'axios';

const fetchJishoData = async () => {
  try {
    const response = await axios.get('https://jisho.org/api/v1/search/words?keyword=%E3%81%82%E3%82%8A%E3%81%8C%E3%81%A8%E3%81%86');
    const data = response.data;
    console.log(data); // ทำอะไรกับข้อมูลที่ได้ เช่น แสดงผลใน component

  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export default fetchJishoData