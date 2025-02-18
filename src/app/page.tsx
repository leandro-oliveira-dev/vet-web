// import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="text-center mb-8">
        {/* Título da clínica */}
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">Clínica Veterinária Paws & Cia</h1>
      </header>

      <main className="flex flex-col sm:flex-row gap-8 row-start-2 items-start">
        {/* Container para a imagem e o texto lado a lado */}
        <div className="flex sm:flex-row gap-8 sm:items-start">
          <div className="flex-shrink-0">
            <Image
              src="/cute-animals-group-white-background.png"
              alt="pets home"
              width={500}
              height={400}
            />
          </div>
          <div className="flex flex-col justify-start h-auto overflow-y-auto max-h-[400px]">
            <p className="text-lg sm:text-xl text-gray-700">
              Bem-vindo à Clínica Veterinária Paws & Cia!

              Na Clínica Veterinária Paws & Cia, cuidamos dos seus animais com muito carinho e dedicação. Nosso compromisso é oferecer cuidados de saúde de qualidade, com uma equipe de veterinários altamente capacitados e preparados para atender desde o seu petzinho mais novo até o seu amigo de longa data. Estamos aqui para garantir que seus animais de estimação vivam felizes e saudáveis por muitos anos!

              Além dos nossos serviços médicos de excelência, temos também uma Loja Pet completa, onde você encontra tudo o que seu animal precisa: desde ração de alta qualidade até brinquedos, acessórios e produtos de higiene. Nossa loja foi pensada para oferecer praticidade e qualidade em um só lugar, para que você possa cuidar da saúde e bem-estar do seu pet com todo o conforto.

              Oferecemos uma ampla gama de serviços, incluindo:

              Consultas veterinárias: exames clínicos, diagnóstico e tratamentos personalizados.
              Vacinação: proteção contra doenças, mantendo seu pet seguro e saudável.
              Exames laboratoriais: exames de rotina e emergenciais para um diagnóstico preciso.
              Cirurgias: procedimentos cirúrgicos com toda a segurança e acompanhamento.
              Emergências 24h: atendimento emergencial para situações críticas.
              Loja Pet: ração, brinquedos, acessórios, cosméticos e muito mais, para o cuidado diário do seu pet.
              Estamos prontos para atender seu animal com toda a atenção e carinho que ele merece, seja em uma consulta de rotina, uma emergência, ou até mesmo quando você precisar de algum produto da nossa loja para mimar seu amigo.

              Paws & Cia, mais do que um atendimento veterinário, é um lugar onde seu pet sempre será tratado como parte da nossa família.
            </p>
          </div>
        </div>
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
