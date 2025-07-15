import localFont from 'next/font/local'

export const gontSerrat = localFont({
    src: [
        { path: '../public/fonts/Gontserrat/Gontserrat-Thin.ttf', weight: '100', style: 'normal' },
        { path: '../public/fonts/Gontserrat/Gontserrat-ThinItalic.ttf', weight: '100', style: 'italic' },
        { path: '../public/fonts/Gontserrat/Gontserrat-ExtraLight.ttf', weight: '200', style: 'normal' },
        { path: '../public/fonts/Gontserrat/Gontserrat-ExtraLightItalic.ttf', weight: '200', style: 'italic' },
        { path: '../public/fonts/Gontserrat/Gontserrat-Light.ttf', weight: '300', style: 'normal' },
        { path: '../public/fonts/Gontserrat/Gontserrat-LightItalic.ttf', weight: '300', style: 'italic' },
        { path: '../public/fonts/Gontserrat/Gontserrat-Regular.ttf', weight: '400', style: 'normal' },
        { path: '../public/fonts/Gontserrat/Gontserrat-Italic.ttf', weight: '400', style: 'italic' },
        { path: '../public/fonts/Gontserrat/Gontserrat-Medium.ttf', weight: '500', style: 'normal' },
        { path: '../public/fonts/Gontserrat/Gontserrat-MediumItalic.ttf', weight: '500', style: 'italic' },
        { path: '../public/fonts/Gontserrat/Gontserrat-SemiBold.ttf', weight: '600', style: 'normal' },
        { path: '../public/fonts/Gontserrat/Gontserrat-SemiBoldItalic.ttf', weight: '600', style: 'italic' },
        { path: '../public/fonts/Gontserrat/Gontserrat-Bold.ttf', weight: '700', style: 'normal' },
        { path: '../public/fonts/Gontserrat/Gontserrat-BoldItalic.ttf', weight: '700', style: 'italic' },
        { path: '../public/fonts/Gontserrat/Gontserrat-ExtraBold.ttf', weight: '800', style: 'normal' },
        { path: '../public/fonts/Gontserrat/Gontserrat-ExtraBoldItalic.ttf', weight: '800', style: 'italic' },
        { path: '../public/fonts/Gontserrat/Gontserrat-Black.ttf', weight: '900', style: 'normal' },
        { path: '../public/fonts/Gontserrat/Gontserrat-BlackItalic.ttf', weight: '900', style: 'italic' },
    ],
    variable: '--font-gontSerrat',
    display: 'swap',
})

export const timeLess = localFont({
    src: [
        { path: '../public/fonts/timeless/Timeless.ttf', weight: '100', style: 'normal' },
        { path: '../public/fonts/timeless/Timeless-Bold.ttf', weight: '100', style: 'italic' },
    ],
    variable: '--font-timeless',
    display: 'swap',
})

