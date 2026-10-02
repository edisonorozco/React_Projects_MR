import React, { useEffect, useState } from 'react';
import './Adoptions.css'
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import Footer from '../../footer/Footer';

export default function Adoptions() {

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 2; // Número de elementos por página
    const pageCount = Math.ceil(data.length / itemsPerPage);
    const [showModal, setShowModal] = useState(false);
    const [selectedImageSrc, setSelectedImageSrc] = useState('');

    const json = {
        "pet": [
            {
                "image": "../images/1.png",
                "description": "Este tierno cachorrito es una dulce mezcla de color marrón y negro, con un corazón tan cálido que te llenara de amor la vida."
            },
            {
                "image": "../images/2.png",
                "description": "Conoce a nuestro encantador perrito blanco, con una personalidad juguetona y unos ojos conmovedores que te robarán el corazón."
            },
            {
                "image": "../images/3.png",
                "description": "Haz parte de tu familia este tierno perrito, el cual esta esperando el calor de un hogar."
            },
            {
                "image": "../images/4.png",
                "description": "Es una de las perritas más cariñosas, y cuidadosas que tenemos en nuestro hogar. Le decimos de amor pitbull, fue rescatada y desde entonces creció junto a nosotros."
            },
            {
                "image": "../images/5.png",
                "description": "Si estás buscando un compañero leal y fiel, no busques más que nuestro hermoso criollito, seguramente te hará vivir aventuras inolvidables."
            },
            {
                "image": "../images/6.png",
                "description": "Este encantador perrito amarillo peludito es simplemente adorable. Su suave y esponjoso pelaje de color amarillo le da un aspecto único y llamativo que roba corazones a primera vista."
            },
            {
                "image": "../images/23.png",
                "description": "Es el compañero perfecto para acurrucarse en cualquier momento del día. Siempre está dispuesto a compartir cariño y afecto con todos a su alrededor."
            },
            {
                "image": "../images/8.png",
                "description": "Este peludito es tan cariñoso como inteligente, lo que lo hace muy fácil de entrenar y socializar."
            },
            {
                "image": "../images/9.png",
                "description": " Su amabilidad y buen temperamento lo convierten en un amigo perfecto para niños y adultos por igual. "
            },
            {
                "image": "../images/10.png",
                "description": "Su amor incondicional y lealtad harán que siempre quieras tenerlo cerca."
            },
            {
                "image": "../images/11.png",
                "description": "Si buscas un compañero leal, alegre y lleno de amor, este perrito amarillo peludito es la elección perfecta. "
            },
            {
                "image": "../images/12.png",
                "description": " Sin duda, llenará tu vida de alegría y felicidad, convirtiéndose en un miembro muy especial de tu familia. "
            },
            {
                "image": "../images/13.png",
                "description": "Su corazón es enorme y rebosa de cariño. Es un compañero fiel que siempre está dispuesto a brindar amor y lealtad incondicional. "
            },
            {
                "image": "../images/14.png",
                "description": "Su naturaleza amigable y extrovertida lo convierte en la mascota ideal para compartir momentos felices y crear memorias inolvidables."
            },
            {
                "image": "../images/15.png",
                "description": "Su inteligencia y rápida adaptabilidad lo hacen aprender trucos y órdenes con facilidad, lo que lo convierte en el consentido de todos."
            },
            {
                "image": "../images/16.png",
                "description": "Este peludito es una fuente inagotable de alegría y diversión, siempre dispuesto a embarcarse en nuevas aventuras y descubrir el mundo junto a sus seres queridos. "
            },
            {
                "image": "../images/17.png",
                "description": "Si estás buscando un amigo fiel y cariñoso, este peludito es la elección perfecta para llenar tu vida de felicidad y compañía."
            },
            {
                "image": "../images/18.png",
                "description": "Con un carácter amable y tranquilo, este peludito es el compañero perfecto para aquellos que buscan serenidad y calma en su vida. "
            },
            {
                "image": "../images/19.png",
                "description": "Su dulzura innata lo convierten en un excelente amigo para personas de todas las edades. Es el confidente ideal para los más pequeños y un compañero cariñoso para los adultos. "
            },
            {
                "image": "../images/20.png",
                "description": "A este peludito le encanta descubrir nuevos lugares y aprender sobre su entorno. Disfrutará enormemente de paseos al aire libre y explorar la naturaleza junto a ti."
            },
            {
                "image": "../images/21.png",
                "description": "Este peludito es la personificación de la dulzura y el amor. Su presencia en tu vida te llenará de alegría y calidez."
            },
            {
                "image": "../images/22.png",
                "description": "No dudes en abrirle las puertas de tu hogar y corazón a este perrito, porque encontrarás en él a un amigo fiel y cariñoso que nunca te defraudará. "
            }
        ]
    };

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = () => {
        {/* fetch('./adoptions.json')
            .then(response => response.json())
            .then(data => console.log(data))
            .then(data => setData(data))
    .catch(error => console.error('Error al cargar los datos:', error));*/}
        setData(json.pet);
    };

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    useEffect(() => {
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setData(json.pet.slice(startIndex, endIndex));
    }, [currentPage]);

    // Función para mostrar el modal
    const openModal = (src) => {
        setSelectedImageSrc(src);
        setShowModal(true);
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <div className='container__adoptions'>
                <h1>Adopciones</h1>
                <table className='table-style'>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Descripción</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.description}>
                                <td>
                                    <img className='image_size' src={item.image} alt={item.description} onClick={() => openModal(item.image)} />
                                </td>
                                <td className='column__description'>{item.description}</td>
                                <td>
                                    <Link to='/contact'>
                                        <button className='button-contact' onClick={() => {

                                        }}>
                                            Contacto
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/** =============================== SMALL DEVICES ============================================================ */}


            <div className='container__adoptions__small__devices'>
                <h1>Adopciones</h1>
                <table className='table-style'>
                    <thead>
                        <tr>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <React.Fragment key={index}>
                                <tr>
                                    <td>
                                        <img className='image_size' src={item.image} alt={item.description} onClick={() => openModal(item.image)} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className='column__description'>{item.description}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <Link to='/contact'>
                                            <button className='button-contact' onClick={() => {

                                            }}>
                                                Contacto
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>

            <ReactPaginate className='react_pagination'
                previousLabel={'Anterior'}
                nextLabel={'Siguiente'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={Math.ceil(json.pet.length / itemsPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
            />
            {showModal && (
                <div className="modal" onClick={closeModal}>
                    <div className="modal-content">
                        <img src={selectedImageSrc} alt="Descripción de la imagen" className='img_modal' />
                        <i className='bx bx-x' onClick={closeModal} />
                    </div>
                </div>
            )}
        </>
    );
};

