/** @type {import('tailwindcss').Config} */
module.exports = {
	// Tailwind의 class이름이 포함된 파일에 대한 경로를 구성하는 부분을 추가합니다.
	// src경로 내부에 자바스크립트, 타입스크립트, jsx를 리턴하는 파일들을 모두 작성 해줍니다.
  content: ['index.html', './src/**/*.{js,vue}'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        custom: {
          'F5A742': '#F5A742',
        }
      }
    },
  },
  plugins: [],
}