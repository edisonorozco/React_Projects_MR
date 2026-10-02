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
                "image": "../images/PERRITO1.jpeg",
                "description": "Este tierno cachorrito de tres meses es una dulce mezcla de color marrón, con un corazón tan cálido que te llenara de amor la vida."
            },
            {
                "image": "../images/PERRITO2.jpeg",
                "description": "Conoce a nuestro encantador cachorro negro de un año de edad, con una personalidad juguetona y unos ojos conmovedores que te robarán el corazón."
            },
            {
                "image": "../images/PERRITO3.jpeg",
                "description": "Haz parte de tu familia este tierno cachorrito marrón de tres meses, el cual esta esperando el calor de un hogar."
            },
            {
                "image": "../images/PERRITO4.jpeg",
                "description": "Estos hermosos perritos de más de dos años de edad, están llenos de amor y afecto. Son de naturaleza juguetona y dulce temperamento los cuales llenarán de amor tu hogar."
            },
            {
                "image": "../images/PERRITO5.jpeg",
                "description": "Si estás buscando un compañero leal y fiel, no busques más que nuestro hermoso criollito. Con su suave comportamiento, seguramente te hará vivir aventuras inolvidables."
            },
            {
                "image": "../images/PERRITO5.jpeg",
                "description": "Si estás buscando un compañero leal y fiel, no busques más que nuestro hermoso criollito. Con su suave comportamiento, seguramente te hará vivir aventuras inolvidables."
            },
            {
                "image": "../images/PERRITO5.jpeg",
                "description": "Si estás buscando un compañero leal y fiel, no busques más que nuestro hermoso criollito. Con su suave comportamiento, seguramente te hará vivir aventuras inolvidables."
            },
            {
                "image": "../images/PERRITO5.jpeg",
                "description": "Si estás buscando un compañero leal y fiel, no busques más que nuestro hermoso criollito. Con su suave comportamiento, seguramente te hará vivir aventuras inolvidables."
            },
            {
                "image": "../images/PERRITO5.jpeg",
                "description": "Si estás buscando un compañero leal y fiel, no busques más que nuestro hermoso criollito. Con su suave comportamiento, seguramente te hará vivir aventuras inolvidables."
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
                            <th>Mi historia</th>
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

