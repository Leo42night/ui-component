
# Tech Stack
- Vite + React + TypeScript
- Tailwind & Shadcn/ui



## Installation

Project in menggunakan `pnpm`, sebagai package manager node yang paling ringan

### Requirement - Install PNPM
```bash
npm install -g pnpm
```
setelah install `pnpm`, buka terminal baru dan cek
```bash
pnpm -v
```

### Install Dependensi
```bash
pnpm install
```


    
## Struktur Folder

```
|-src/
    |-componens/
        |-[icon, nav, dsb.]/ (folder tiap komponen)
    |-pages/
        |-Home.jsx (halaman menu utama)
        |-Navs.jsx (koleksi komponen Navs)
        |-[koleksi lainnya...].jsx
```
### Jika ingin membuat komponen baru
Jika ingin menambah type Nav baru, tambahkan item komponen di dalam `src/componens/nav/NavOther.jsx`. kemudian masukkan komponennya ke dalam code `Navs.jsx`
```jsx
import Nav from "@/components/nav/Nav"
import NavOther from "@/components/nav/NavOther"
import { Separator } from "@/components/ui/separator"

const Navs = () => {
  return (
    <div>
      <Nav />
      <Separator className="my-4"/>
      <NavOther />
      <Separator className="my-4"/>
    </div>
  )
}
```
Jika komponen yang dibuat belum ada folder dan Halaman Collection nya maka anda bisa buat sendiri aja 🙏.
## Ekstensi VS Code yang Membantu
- [VS Code ES7 React/Redux/React-Native/JS snippets](https://github.com/rodrigovallades/vscode-es7-javascript-react-snippets)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [Codeium: Free AI-powered code acceleration toolkit](https://codeium.com/)
