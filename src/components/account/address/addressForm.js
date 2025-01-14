import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-free/js/all.js';

import "../../../assets/css/account/address.css";
import Loading from "../../loading/loading";
import url from "../../../config.json"


function Address(theme) {
    const token = localStorage.getItem('token');
    const [IsLoading, setisLoading] = useState(false)
    const [Error, setError] = useState("")
    const data = {
        تهران: {
            cities: ['تهران', 'شهریار', 'ملارد', 'ری', 'اسلامشهر', 'پردیس'],
            counties: ['تهران', 'شمیرانات', 'ری', 'اسلامشهر', 'پردیس']
        },
        اصفهان: {
            cities: ['اصفهان', 'کاشان', 'نجف‌آباد', 'خمینی‌شهر', 'دولت‌آباد'],
            counties: ['اصفهان', 'خمینی‌شهر', 'نجف‌آباد', 'کاشان', 'دولت‌آباد']
        },
        فارس: {
            cities: ['شیراز', 'مرودشت', 'جهرم', 'فسا', 'نی‌ریز'],
            counties: ['شیراز', 'مرودشت', 'جهرم', 'فسا', 'نی‌ریز']
        },
        خراسان_رضوی: {
            cities: ['مشهد', 'نیشابور', 'سبزوار', 'تربت حیدریه', 'کاشمر'],
            counties: ['مشهد', 'نیشابور', 'سبزوار', 'تربت حیدریه', 'کاشمر']
        },
        آذربایجان_شرقی: {
            cities: ['تبریز', 'مراغه', 'آذرشهر', 'اهر', 'بستان‌آباد'],
            counties: ['تبریز', 'مراغه', 'آذرشهر', 'اهر', 'بستان‌آباد']
        },
        آذربایجان_غربی: {
            cities: ['ارومیه', 'خوی', 'ماکو', 'پلدشت', 'سلماس'],
            counties: ['ارومیه', 'خوی', 'ماکو', 'پلدشت', 'سلماس']
        },
        البرز: {
            cities: ['کرج', 'ساوجبلاغ', 'نظرآباد', 'طالقان'],
            counties: ['کرج']
        },
        بوشهر: {
            cities: ['بوشهر', 'گناوه', 'دیلم', 'دشتستان'],
            counties: ['بوشهر']
        },
        چهارمحال_وبختیاری: {
            cities: ['شهرکرد', 'بروجن', 'فارسان'],
            counties: ['شهرکرد']
        },
        خراسان_شمالی: {
            cities: ['بجنورد', 'اسفراین', 'شیروان'],
            counties: ['بجنورد']
        },
        زنجان: {
            cities: ['زنجان', 'خرمدره', 'طارم', 'ابهر'],
            counties: ['زنجان']
        },
        سمنان: {
            cities: ['سمنان', 'شاهرود', 'دامغان'],
            counties: ['سمنان']
        },
        سیستان_و_بلوچستان: {
            cities: ['زاهدان', 'زابل', 'خاش', 'ایرانشهر', 'چابهار'],
            counties: ['زاهدان', 'زابل', 'خاش', 'ایرانشهر', 'چابهار']
        },
        قزوین: {
            cities: ['قزوین', 'البرز', 'بوئین‌زهرا'],
            counties: ['قزوین']
        },
        قم: {
            cities: ['قم'],
            counties: ['قم']
        },
        کردستان: {
            cities: ['سنندج', 'قروه', 'بیجار'],
            counties: ['سنندج']
        },
        کرمان: {
            cities: ['کرمان', 'رفسنجان', 'زرند', 'بم', 'سیرجان'],
            counties: ['کرمان', 'رفسنجان', 'زرند', 'بم', 'سیرجان']
        },
        کرمانشاه: {
            cities: ['کرمانشاه', 'سنقر و کلیایی'],
            counties: ['کرمانشاه']
        },
        کهگیلویه_و_بویراحمد: {
            cities: ['یاسوج', 'گچساران', 'دوگنبدان'],
            counties: ['یاسوج', 'گچساران', 'دوگنبدان']
        },
        گلستان: {
            cities: ['گرگان', 'گنبد کاووس', 'علی‌آباد', 'آق‌قلا', 'کلاله'],
            counties: ['گرگان', 'گنبد کاووس', 'علی‌آباد', 'آق‌قلا', 'کلاله']
        },
        گیلان: {
            cities: ['رشت', 'لاهیجان', 'آستارا', 'بندر انزلی', 'رودسر'],
            counties: ['رشت', 'لاهیجان', 'آستارا', 'بندر انزلی', 'رودسر']
        },
        مازندران: {
            cities: ['ساری', 'بابل', 'آمل', 'قائم‌شهر', 'بهشهر'],
            counties: ['ساری', 'بابل', 'آمل', 'قائم‌شهر', 'بهشهر']
        },
        هرمزگان: {
            cities: ['بندرعباس', 'قشم', 'میناب', 'بندر لنگه', 'کیش'],
            counties: ['بندرعباس', 'قشم', 'میناب', 'بندر لنگه', 'کیش']
        },
        یزد: {
            cities: ['یزد', 'اردکان', 'میبد', 'مهریز', 'ابرکوه'],
            counties: ['یزد', 'اردکان', 'میبد', 'مهریز', 'ابرکوه']
        },
        همدان: {
            cities: ['همدان', 'ملایر', 'نهاوند', 'کبودرآهنگ', 'رزن'],
            counties: ['همدان', 'ملایر', 'نهاوند', 'کبودرآهنگ', 'رزن']
        },
        لرستان: {
            cities: ['خرم‌آباد', 'بروجرد', 'دورود', 'کوهدشت', 'الیگودرز'],
            counties: ['خرم‌آباد', 'بروجرد', 'دورود', 'کوهدشت', 'الیگودرز']
        },
        خوزستان: {
            cities: ['اهواز', 'آبادان', 'خرمشهر', 'دزفول', 'ماهشهر'],
            counties: ['اهواز', 'آبادان', 'خرمشهر', 'دزفول', 'ماهشهر']
        }
    };

    const [Profile_id, setProfile_id] = useState("")
    useEffect(() => {
        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
        myHeaders.append("X-CSRFToken", "1catw3IpqjPm82a19BnpB3h97CUiCReGSPOsSvJ7NqGtvayHgOKf63rpDKWSqQui");
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch(`${url.baseUrl}/auth/profile/1/`, requestOptions)
            .then((response) => response.json())
            .then((result) => setProfile_id(result.id))
            .catch((error) => console.error(error));
    }, []);

    const [selectedProvince, setSelectedProvince] = useState('');
    const [cities, setCities] = useState([]);
    const [counties, setCounties] = useState([]);
    const [Ostan, setOstan] = useState("")

    const handleProvinceChange = (event) => {
        const province = event.target.value;
        setSelectedProvince(province);
        setCities(data[province]?.cities || []);
        setCounties(data[province]?.counties || []);
        setOstan(event.target.value);
    };
    const [Name, setName] = useState("")
    const handleName = (event) => {
        setName(event.target.value);
    };
    const [Address, setAddress] = useState("")
    const handleAddress = (event) => {
        setAddress(event.target.value);
    };
    const [Phone, setPhone] = useState()
    const handlePhone = (event) => {
        setPhone(event.target.value);
    };

    const [Shahr, setShahr] = useState("")
    const handleShahr = (event) => {
        setShahr(event.target.value);
    };
    const [PostCode, setPostCode] = useState("")
    const HandlePostCode = (event) => {
        setPostCode(event.target.value);
    };

    function STS() {
        if (!Profile_id || !Name || !Address || !Ostan || !Shahr || !PostCode) {
            setError("اطلاعات خواسته شده را تکمیل کنید!");
            return;
        }
        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("X-CSRFToken", "K3pUKlDKLUZFsL3nSzrm8K6VQ5uoTWNXA6mlMlJcCjJUTl7n1qpLebKqIMXdQnUg");
        myHeaders.append("Authorization", `Bearer ${token}`);


        const raw = JSON.stringify({
            "profile": Profile_id,
            "name": Name,
            "address": Address,
            "ostan": Ostan,
            "shahr": Shahr,
            "postcode": PostCode,
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        setisLoading(true)
        fetch(`${url.baseUrl}/auth/address/`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                setIsOverlayOpen(false);
                window.location.reload();
                setisLoading(false)

            })
            .catch((error) => console.error(error));
    }

    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

    const handleOverlay = () => {
        setIsOverlayOpen(!isOverlayOpen);
    };



    return (<>
        {IsLoading ? <Loading /> : null}
        <div class="col-md-12 pt-2 fontr" >
            <div class="col-md-12" style={{ borderStyle: "dashed" }}>
                <buttton class="col-md-12 btn btn-lg col-12 border-0" onClick={handleOverlay}><h4 className={theme.theme.theme === "dark" ? "text-light" : "text-dark"}>افزودن آدرس</h4></buttton>
            </div>
        </div>
        {isOverlayOpen ? <>
            <div class="overlay row m-0 fontr" dir="rtl">
                <div class="col-md-12 d-flex justify-content-center">
                    <div class=" col-md-8 p-3" style={{ backgroundColor: "#ffffff" }}>
                        <div class="col-md-12  text-center p-1 h4 row m-0">
                            <div class="justify-content-end col-12 col-md-12 d-flex" style={{ height: "25px" }}>
                                <button class="btn btn-lg border-0" onClick={handleOverlay}><i class="fa fa-times" aria-hidden="true"></i></button>
                            </div>
                            <span class="text-dark">افزودن آدرس جدید</span>
                        </div>
                        <div class="col-md-12 text-end">
                            <span class="text-dark h5 p-1">نام آدرس مورد نظر:*</span>
                            <div class="pt-2 col-md-12 p-3">
                                <input class="form-control form-control-lg border-dark rounded-0" onChange={handleName}></input>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="fontr row m-0 pt-2" dir="rtl" style={{ color: "#000000" }}>
                                <div class="col-md-6 col-6 ">
                                    <label class="h5">
                                        انتخاب استان:
                                        <div class="pt-2">
                                            <select class="form-select rounded-0" value={selectedProvince} onChange={handleProvinceChange}>
                                                <option value="">انتخاب کنید</option>
                                                {Object.keys(data).map((province) => (
                                                    <option key={province} value={province}>
                                                        {province}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </label>
                                </div>
                                <div class="col-md-6 col-6">
                                    <label class="h5">
                                        انتخاب شهر:
                                        <div class="pt-2">

                                            <select class="form-select rounded-0" disabled={!selectedProvince} onClick={handleShahr}>
                                                <option value="">انتخاب کنید</option>
                                                {cities.map((city) => (
                                                    <option key={city} value={city} >
                                                        {city}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12"><span class="text-dark" style={{ paddingRight: "10px" }}>اگر شهر مورد نظر شما در لیست نیست آن ر در آدرس پستی درج کنید.</span></div>
                        <div class="co-md-12 row m-0 pt-2">
                            <div class="col-md-6 text-end">
                                <span class="text-dark h5">کد پستی*</span>
                                <div class="pt-2 col-md-12 p-1">
                                    <input class="form-control form-control-lg border-dark rounded-0" onChange={HandlePostCode} dir="ltr"></input>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12 p-3 text-end">
                            <span class="text-dark h5">آدرس پستی *</span>
                            <textarea
                                rows="4"
                                class="form-control border-dark rounded-0 textarea pt-3"
                                placeholder="آدرس تحویل گیرنده را وارد کنید"
                                onChange={handleAddress}
                            />
                        </div>
                        {Error ? <div class="col-md-12 d-flex justify-content-center" style={{ paddingRight: "10px" }} dir=" rtl"><h4 class="text-light bg-danger">{Error}</h4></div> : <></>}
                        <div class="col-md-12 col-12 row m-1">
                            <div class="col-md-10 col-8"></div>
                            <div class="col-md-1 col-2 "><button class="btn rounded-0  text-light" style={{ backgroundColor: "#000000" }} onClick={handleOverlay}>انصراف</button></div>
                            <div class="col-md-1 col-2 "><button class="btn  rounded-0  text-light" style={{ backgroundColor: "#000000" }} onClick={STS}>ثبت</button></div>

                        </div>
                    </div>

                </div>
            </div>
        </> : <></>}
    </>);
}

export default Address;