import { connect } from 'react-redux';
import card from '../components/card';
import { updateCard } from '../actions/card';
import { updateCardFromServer } from '../actions/card';

export const Card = connect(
    function mapStateToProps(state) {
        return { card: state };
    },
    function mapDispatchToProps(dispatch) {
        return {
            updateCard: (card) => dispatch(updateCard(card)),
            updateCardFromServer: (card) => dispatch(updateCardFromServer())
        };
    }
)(card);