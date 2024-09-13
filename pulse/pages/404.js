import React from 'react';
import MainLayout from '../components/layouts/Layout';
import NotFound from '../components/layouts/page/error/404';

function _404(props) {
    return (
        <MainLayout>
            <NotFound />
        </MainLayout>
    );
}

export default _404;