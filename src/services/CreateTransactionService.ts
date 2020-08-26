import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    const { total } = this.transactionsRepository.getBalance();
    if (type === 'outcome' && value > total) {
      throw Error(
        'should not be able to create outcome transaction without a valid balance',
      );
    }
    return this.transactionsRepository.create({ title, value, type });
  }
}

export default CreateTransactionService;
