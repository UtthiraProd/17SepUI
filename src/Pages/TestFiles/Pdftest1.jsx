//importing pdfmake to generate our PDF file
import pdfMake from "pdfmake/build/pdfmake"
//importing the fonts whichever present inside vfs_fonts file
import pdfFonts from "pdfmake/build/vfs_fonts"
//importing the encoded font file into our project
import tamilFont from './TamilFontBase64'
// import "./pdfmake.scss"
//Making use of all the fonts defined
pdfMake.vfs = pdfFonts.pdfMake.vfs
//Adding our own font into the vfs
window.pdfMake.vfs["TiroTamil-Regular.ttf"] = tamilFont



// Path to your Tamil font file

export function Pdftest1() {


  const rasiNames = [
    'சூ சுக்', 'குரு', 'சந்',    '',
    'ராகு',     '',    '',     'கேது',
    'சனி',    '',      '', 'செவ் புத'
  ];

  // horoscope:{
  //   mesha:
  //   vrishba:
  //   mithuna:
  //   karkata:
  //   simha:
  //   kanya:
  //   tula:
  //   vrishika:
  //   dhanu:
  //   makara:
  //   khumbha:
  //   meena:
  //   dhasa:
  //   year:
  //   month:
  //   day:
  //   }



  // const content = [
  //   [{ text: rasiNames[0], alignment: 'center', bold: true, margin: [0, 20] }, { text: rasiNames[1], alignment: 'center', bold: true, margin: [0, 20] }, { text: rasiNames[2], alignment: 'center', bold: true, margin: [0, 20] }, { text: rasiNames[3], alignment: 'center', bold: true, margin: [0, 20] }],
  //   [{ text: rasiNames[4], alignment: 'center', bold: true, margin: [0, 20] }, { text: '', colSpan: 2, rowSpan: 2, alignment: 'center', bold: true, margin: [0, 20] }, {}, { text: rasiNames[7], alignment: 'center', bold: true, margin: [0, 20] }],
  //   [{ text: rasiNames[8], alignment: 'center', bold: true, margin: [0, 20] }, {}, {}, { text: rasiNames[11], alignment: 'center', bold: true, margin: [0, 20] }],
  //   [{ text: rasiNames[12], alignment: 'center', bold: true, margin: [0, 20] }, { text: rasiNames[13], alignment: 'center', bold: true, margin: [0, 20] }, { text: rasiNames[14], alignment: 'center', bold: true, margin: [0, 20] }, { text: rasiNames[15], alignment: 'center', bold: true, margin: [0, 20] }]
  // ];

  const content = [
    [{ text: rasiNames[0], alignment: 'center', bold: true, margin: [0, 20] }, { text: rasiNames[1], alignment: 'center', bold: true, margin: [0, 20] }, { text: rasiNames[2], alignment: 'center', bold: true, margin: [0, 20] }, { text: rasiNames[3], alignment: 'center', bold: true, margin: [0, 20] }],
    [{ text: rasiNames[4], alignment: 'center', bold: true, margin: [0, 20] }, { text: 'ராசி', alignment: 'center', bold: true, margin: [0, 40], colSpan: 2, rowSpan: 2 }, {}, { text: rasiNames[7], alignment: 'center', bold: true, margin: [0, 20] }],
    [{ text: rasiNames[8], alignment: 'center', bold: true, margin: [0, 20] }, {}, {}, { text: rasiNames[11], alignment: 'center', bold: true, margin: [0, 20] }],
    [{ text: rasiNames[12], alignment: 'center', bold: true, margin: [0, 20] }, { text: rasiNames[13], alignment: 'center', bold: true, margin: [0, 20] }, { text: rasiNames[14], alignment: 'center', bold: true, margin: [0, 20] }, { text: rasiNames[15], alignment: 'center', bold: true, margin: [0, 20] }]
  ];
  
  const content1 = [
    [{ text: rasiNames[0], alignment: 'center', bold: true, margin: [0, 20] }, { text: rasiNames[1], alignment: 'center', bold: true, margin: [0, 20] }, { text: rasiNames[2], alignment: 'center', bold: true, margin: [0, 20] }, { text: rasiNames[3], alignment: 'center', bold: true, margin: [0, 20] }],
    [{ text: rasiNames[4], alignment: 'center', bold: true, margin: [0, 20] }, { text: 'அம்சம்', alignment: 'center', bold: true, margin: [0, 40], colSpan: 2, rowSpan: 2 }, {}, { text: rasiNames[7], alignment: 'center', bold: true, margin: [0, 20] }],
    [{ text: rasiNames[8], alignment: 'center', bold: true, margin: [0, 20] }, {}, {}, { text: rasiNames[11], alignment: 'center', bold: true, margin: [0, 20] }],
    [{ text: rasiNames[12], alignment: 'center', bold: true, margin: [0, 20] }, { text: rasiNames[13], alignment: 'center', bold: true, margin: [0, 20] }, { text: rasiNames[14], alignment: 'center', bold: true, margin: [0, 20] }, { text: rasiNames[15], alignment: 'center', bold: true, margin: [0, 20] }]
  ];

  function printPDF()
  {
    pdfMake.fonts={
      TiroTamilRegular: {
          normal: 'TiroTamil-Regular.ttf',
          bold: 'TiroTamil-Regular.ttf',
          italics: 'TiroTamil-Regular.ttf',
          bolditalics: 'TiroTamil-Regular.ttf'
      }
      
    }
    var docDefinition = {
      content: [
        {
          text: 'உத்திரன் தகவல் நிலயம்',
          style: 'header',
          alignment: 'center',
        },
        {
          text: 'Broker Detail',
          style: 'subheader',
        },
        {
          columns: [
            {
              width: '50%',
              text: [
                { text: 'Name: ', bold: true }, 'Vishnu\n',
                { text: 'Phone: ', bold: true }, '8745635564\n',
              ],
            },
            {
              width: '50%',
              text: [
                { text: 'Address: ', bold: true }, '123 Main St, City, Country\n',
                { text: 'Email: ', bold: true }, 'john.doe@gmail.com\n\n',
              ],
            },
          ],
        },
        {
          text: 'Profile Details',
          style: 'subheader',
        },
      

      {
        columns: [
          {
            width: '25%',
            stack: [
              { text: 'Name: ', bold: true, margin: [0, 0, 0, 8] }, // Added margin bottom
              { text: 'Qualification:', margin: [0, 0, 0, 8] }, // Added margin bottom
              { text: 'Job: ', bold: true, margin: [0, 0, 0, 8] },
              { text: 'Salary per month', margin: [0, 0, 0, 8] },
              { text: 'Date of birth', margin: [0, 0, 0, 8] },
              { text: 'Star: ', bold: true, margin: [0, 0, 0, 8] },
              { text: 'Rasi', margin: [0, 0, 0, 8] },
              { text: 'Religion', margin: [0, 0, 0, 8] },
              { text: 'Caste', margin: [0, 0, 0, 8] },
              { text: 'Sister(s) Unmarried', margin: [0, 0, 0, 8] },
              { text: 'Sister(s) Married', margin: [0, 0, 0, 8] },
              { text: 'Brother(s) Unmarried', margin: [0, 0, 0, 8] },
              { text: 'Brother(s) Married', margin: [0, 0, 0, 8] }
            ],
          },
          {
            width: '5%',
            stack: [ { text: ':', bold: true, margin: [0, 0, 0, 8] }, // Added margin bottom
              { text: ':', margin: [0, 0, 0, 8] }, // Added margin bottom
              { text: ':', bold: true, margin: [0, 0, 0, 8] },
              { text: ':', margin: [0, 0, 0, 8] },
              { text: ':', bold: true, margin: [0, 0, 0, 8] },
              { text: ':', margin: [0, 0, 0, 8] },
              { text: ':', margin: [0, 0, 0, 8] },
              { text: ':', margin: [0, 0, 0, 8] },
              { text: ':', margin: [0, 0, 0, 8] },
              { text: ':', margin: [0, 0, 0, 8] },
              { text: ':', margin: [0, 0, 0, 8] },
              { text: ':', margin: [0, 0, 0, 8] },
              { text: ':', margin: [0, 0, 0, 8] }
            ]
          },
          {
            width: '70%',
            stack: [
              { text: 'Guru', bold: true, margin: [0, 0, 0, 8] },
              { text: 'B.sc Computer', margin: [0, 0, 0, 8] },
              { text: 'Software Engineer', bold: true, margin: [0, 0, 0, 8] },
              { text: '100000', margin: [0, 0, 0, 8] },
              { text: '25/08/1990', bold: true, margin: [0, 0, 0, 8] },
              { text: 'அஸ்தம்', bold: true, margin: [0, 0, 0, 8] },
              { text: 'கன்னி', margin: [0, 0, 0, 8] },
              { text: 'Hindu', margin: [0, 0, 0, 8] },
              { text: 'Nadar', margin: [0, 0, 0, 8] },
              { text: '2', margin: [0, 0, 0, 8] },
              { text: '0', margin: [0, 0, 0, 8] },
              { text: '1', margin: [0, 0, 0, 8] },
              { text: '1', margin: [0, 0, 0, 8] },
            ],
          },
        ],
      },  
      {

        columns:[
          {
            width:'50%',
        style: 'table',
        table: {
          widths: [50, 50, 50, 50],
          body: content
        },
        layout: {
          hLineColor: () => '#000000',
          vLineColor: () => '#000000',
          hLineWidth: () => 1,
          vLineWidth: () => 1
        }
      },
      {
        width:'50%',
    style: 'table',
    table: {
      widths: [50, 50, 50, 50],
      body: content1
    },
    layout: {
      hLineColor: () => '#000000',
      vLineColor: () => '#000000',
      hLineWidth: () => 1,
      vLineWidth: () => 1
    }
  }
      ]

      },

      {
        columns: [
          {
            width: '20%',
            stack: [
              { text: 'திசை இருப்பு : ', bold: true, margin: [0, 0, 0, 8] }, // Added margin bottom
            
            ],
          },
          {
            width: '20%',
            stack: [ { text: 'சூரியன்', bold: true, margin: [0, 0, 0, 8] }, // Added margin bottom
              
            ]
          },
          {
            width: '3%',
            stack: [
              { text: '12', bold: true, margin: [0, 0, 0, 8] },
             
            ],
          },
          {
            width: '15%',
            stack: [
              { text: 'வருடம்', bold: true, margin: [0, 0, 0, 8] },
             
            ],
          },
          {
            width: '3%',
            stack: [
              { text: '12', bold: true, margin: [0, 0, 0, 8] },
             
            ],
          },
          {
            width: '10%',
            stack: [
              { text: 'மாதம்', bold: true, margin: [0, 0, 0, 8] },
             
            ],
          },
          {
            width: '3%',
            stack: [
              { text: '20', bold: true, margin: [0, 0, 0, 8] },
             
            ],
          },
          {
            width: '10%',
            stack: [
              { text: 'நாள்', bold: true, margin: [0, 0, 0, 8] },
             
            ],
          },
        ],
      }, 

      ],
      styles: {
        header: {
          fontSize: 22,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5],
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black',
        },
        table: {
          margin: [0, 5, 0, 15]
        }
      },
      defaultStyle: {
        font: 'TiroTamilRegular',
      },
    };
      pdfMake.createPdf(docDefinition).download();
  }

return (
    <div>
      <button onClick={printPDF}>Generate PDF</button>
      <div className="container">
    <div className="item">
        <button onClick="printPdf(2)">Print PDF</button>
        <button onClick="printPdf(1)">Generate PDF </button>
    </div>
    
    <div className="item">
        <div id="canvas"/>
    </div>
</div>

<div className="vertical-line"></div>
    </div>

    
  );

}