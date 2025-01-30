import { useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

function Agenda() {

    useEffect(() => {
      document.title = "Agenda | May'Humanlab";
    }, []);

    return (
        <>
            <Header />
            <main className="mb-8 p-8">
            <h1 className="font-jura text-center my-6 mb-14 font-bold text-2xl lg:text-4xl">
                Agenda
            </h1>
                <iframe className="border-solid border-2 border-black rounded-lg m-auto mt-12 sm:hidden" src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Europe%2FParis&showPrint=0&showTz=0&showTitle=0&mode=AGENDA&src=bWF5aHVtYW5sYWJAZ21haWwuY29t&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=ZnIuZnJlbmNoI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%2333B679&color=%230B8043" width="300" height="600" frameborder="0" scrolling="no"></iframe>
                <iframe className="border-solid border-2 border-black rounded-lg m-auto mt-12 hidden sm:block md:hidden" src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Europe%2FParis&showPrint=0&showTz=0&showTitle=0&mode=AGENDA&src=bWF5aHVtYW5sYWJAZ21haWwuY29t&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=ZnIuZnJlbmNoI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%2333B679&color=%230B8043" width="450" height="600" frameborder="0" scrolling="no"></iframe>
                <iframe className="border-solid border-2 border-black rounded-lg m-auto mt-12 hidden md:block lg:hidden" src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Europe%2FParis&showPrint=0&showTz=0&showTitle=0&mode=MONTH&src=bWF5aHVtYW5sYWJAZ21haWwuY29t&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=ZnIuZnJlbmNoI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%2333B679&color=%230B8043" width="700" height="500" frameborder="0" scrolling="no"></iframe>
                <iframe className="border-solid border-2 border-black rounded-lg m-auto mt-12 hidden lg:block xl:hidden" src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Europe%2FParis&showPrint=0&showTz=0&showTitle=0&mode=MONTH&src=bWF5aHVtYW5sYWJAZ21haWwuY29t&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=ZnIuZnJlbmNoI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%2333B679&color=%230B8043" width="1000" height="700" frameborder="0" scrolling="no"></iframe>
                <iframe className="border-solid border-2 border-black rounded-lg m-auto mt-12 hidden xl:block" src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Europe%2FParis&showPrint=0&showTz=0&showTitle=0&mode=MONTH&src=bWF5aHVtYW5sYWJAZ21haWwuY29t&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=ZnIuZnJlbmNoI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%2333B679&color=%230B8043" width="1000" height="700" frameborder="0" scrolling="no"></iframe>
            </main>
            <Footer contactVisible={false} />
        </>)
};

export default Agenda;