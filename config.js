const categories = [
    {
        type: "mountain-bikes",
        name: "🚵 จักรยานเสือภูเขา",
        image: "https://cdn.discordapp.com/attachments/1334512680009994301/1335978935351119892/0547d6e0-3bc5-438b-8672-c33c465b548c_3.png?ex=67a41d17&is=67a2cb97&hm=d5961e7c413bf652c57fa106adab324b50965cea4c6fce991c46fe4b374c47ea&"
    },
    {
        type: "road-bikes",
        name: "🚴 จักรยานเสือหมอบ",
        image: "https://cdn.discordapp.com/attachments/1334512680009994301/1335978935351119892/0547d6e0-3bc5-438b-8672-c33c465b548c_3.png?ex=67a41d17&is=67a2cb97&hm=d5961e7c413bf652c57fa106adab324b50965cea4c6fce991c46fe4b374c47ea&"
    },
    {
        type: "road-bikes",
        name: "⚡ จักรยานเไฟฟ้า",
        image: "https://cdn.discordapp.com/attachments/1334512680009994301/1335978935351119892/0547d6e0-3bc5-438b-8672-c33c465b548c_3.png?ex=67a41d17&is=67a2cb97&hm=d5961e7c413bf652c57fa106adab324b50965cea4c6fce991c46fe4b374c47ea&"
    }
];



const featuredProducts = [
    {
        name: "จักรยานเสือหมอบ รุ่น A",
        price: 8500,
        image: "https://cdn.discordapp.com/attachments/1024611424305168454/1172972797283282994/image-removebg-preview_2.png?ex=67a45ccb&is=67a30b4b&hm=bcb383d7bfce35345f195bb9bcc0aab93ebd90aec862d169f007afd0f3177774&",
        link: "product.html?category=road-bikes&name=จักรยานเสือหมอบ รุ่น A"
    },
    {
        name: "จักรยานเสือภูเขา รุ่น B",
        price: 9500,
        image: "https://cdn.discordapp.com/attachments/1024611424305168454/1172514637879713814/02.png?ex=67a40399&is=67a2b219&hm=10b94083705d7392b716a378633f59425f87a4fdf5eba0c3e1aeff458b00bb90&",
        link: "product.html?category=mountain-bikes&name=จักรยานเสือภูเขา รุ่น B"
    }
];




const products = {
    "mountain-bikes": [
        {
            name: "จักรยานเสือภูเขา X - รุ่น 1",
            price: 5500,
            description: "จักรยานเสือภูเขาสำหรับนักปั่นที่ต้องการลุยทุกเส้นทาง",
            featured: true, // ✅ สินค้านี้จะขึ้นใน "สินค้านำเสนอ"
            images: ["https://cdn.discordapp.com/attachments/1334512680009994301/1335978934977953812/0547d6e0-3bc5-438b-8672-c33c465b548c_2.png?ex=67a41d17&is=67a2cb97&hm=76a60855bbd5c587a5c7ae789842572ef6c25a8360164536c96dbaee8aad0b7e&"],
            colors: ["แดง", "ดำ", "น้ำเงิน"],
            colorDetails: {
                "แดง": {
                    name: "จักรยานเสือภูเขา X - สีแดง",
                    price: 5600,
                    description: "🚴‍♂️ รุ่นสีแดง ดีไซน์สปอร์ต เหมาะสำหรับนักปั่นมืออาชีพ!",
                    image: "https://cdn.discordapp.com/attachments/1334512680009994301/1335978934977953812/0547d6e0-3bc5-438b-8672-c33c465b548c_2.png?ex=67a41d17&is=67a2cb97&hm=76a60855bbd5c587a5c7ae789842572ef6c25a8360164536c96dbaee8aad0b7e&"
                },
                "ดำ": {
                    name: "จักรยานเสือภูเขา X - สีดำ",
                    price: 5500,
                    description: "🚵‍♀️ รุ่นสีดำ เรียบหรู ดูเท่ทุกมุมมอง",
                    image: "https://media.discordapp.net/attachments/1334512680009994301/1335978935351119892/0547d6e0-3bc5-438b-8672-c33c465b548c_3.png?ex=67a41d17&is=67a2cb97&hm=d5961e7c413bf652c57fa106adab324b50965cea4c6fce991c46fe4b374c47ea&=&format=webp&quality=lossless&width=908&height=681"
                },
                "น้ำเงิน": {
                    name: "จักรยานเสือภูเขา X - สีน้ำเงิน",
                    price: 5700,
                    description: "🔵 สีสุดคลาสสิค เหมาะกับทุกเส้นทาง",
                    image: "https://cdn.discordapp.com/attachments/1334512680009994301/1335978934977953812/0547d6e0-3bc5-438b-8672-c33c465b548c_2.png?ex=67a41d17&is=67a2cb97&hm=76a60855bbd5c587a5c7ae789842572ef6c25a8360164536c96dbaee8aad0b7e&"
                }
            }
        },
        {
            name: "จักรยานเสือภูเขา X - รุ่น 1",
            price: 5500,
            description: "จักรยานเสือภูเขาสำหรับนักปั่นที่ต้องการลุยทุกเส้นทาง",
            featured: true, // ✅ สินค้านี้จะขึ้นใน "สินค้านำเสนอ"
            images: ["https://media.discordapp.net/attachments/1334512680009994301/1335978934499672178/0547d6e0-3bc5-438b-8672-c33c465b548c_1.png?ex=67a41d17&is=67a2cb97&hm=a62c8f2c74d40859ce5abe36fdf02c78055c61949a05e4994e4ef3b6aaf7ef9f&=&format=webp&quality=lossless&width=908&height=681"],
            colors: ["แดง", "ดำ", "น้ำเงิน"],
            colorDetails: {
                "แดง": {
                    name: "จักรยานเสือภูเขา X - สีแดง",
                    price: 5600,
                    description: "🚴‍♂️ รุ่นสีแดง ดีไซน์สปอร์ต เหมาะสำหรับนักปั่นมืออาชีพ!",
                    image: "https://cdn.discordapp.com/attachments/1334512680009994301/1335978934977953812/0547d6e0-3bc5-438b-8672-c33c465b548c_2.png?ex=67a41d17&is=67a2cb97&hm=76a60855bbd5c587a5c7ae789842572ef6c25a8360164536c96dbaee8aad0b7e&"
                },
                "ดำ": {
                    name: "จักรยานเสือภูเขา X - สีดำ",
                    price: 5500,
                    description: "🚵‍♀️ รุ่นสีดำ เรียบหรู ดูเท่ทุกมุมมอง",
                    image: "https://media.discordapp.net/attachments/1334512680009994301/1335978935351119892/0547d6e0-3bc5-438b-8672-c33c465b548c_3.png?ex=67a41d17&is=67a2cb97&hm=d5961e7c413bf652c57fa106adab324b50965cea4c6fce991c46fe4b374c47ea&=&format=webp&quality=lossless&width=908&height=681"
                },
                "น้ำเงิน": {
                    name: "จักรยานเสือภูเขา X - สีน้ำเงิน",
                    price: 5700,
                    description: "🔵 สีสุดคลาสสิค เหมาะกับทุกเส้นทาง",
                    image: "https://cdn.discordapp.com/attachments/1334512680009994301/1335978934977953812/0547d6e0-3bc5-438b-8672-c33c465b548c_2.png?ex=67a41d17&is=67a2cb97&hm=76a60855bbd5c587a5c7ae789842572ef6c25a8360164536c96dbaee8aad0b7e&"
                }
            }
        }
    ]
};

// config.js
const CONFIG = {
    webhookURL: "https://discord.com/api/webhooks/1336359040279642155/6UmXrbgYbpckblVHNHBWQc4BqoO77x92gDlqwfYp1o-c2Km9N_7WvTZpvxa0jFNBmMbx",

    // โลโก้ของบอท & Embed
    botAvatar: "https://i.imgur.com/YOUR_LOGO.png",
    embedThumbnail: "https://i.imgur.com/YOUR_THUMBNAIL.png",

    // Role IDs (เปลี่ยนเป็น Role ID จริงของเซิร์ฟเวอร์)
    roles: [
        { id: "1336362254311886970", name: "@ADMIN" },
       // { id: "987654321098765432", name: "@Moderator" },
        //{ id: "543210987654321098", name: "@Member" }
    ]
};
