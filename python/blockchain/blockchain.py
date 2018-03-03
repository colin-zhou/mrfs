# coding: utf-8

"""
block = {
    'index': 1,
    'timestamp': 1506057125.900785,
    'transactions': [
        {
            'sender': "8527147fe1f5426f9dd545de4b27ee00",
            'recipient': "a77f5cdfa2934df3954a5c7c7da5df1f",
            'amount': 5,
        }
    ],
    'proof': 324984774000,
    'previous_hash': "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"
}
"""

import hashlib
import json
from time import time
from uuid import uuid4
from urllib.parse import urlparse


class BlockChain(object):
    def __init__(self):
        self.chain = []
        self.current_transactions = []

        # 创建 genesis block
        self.new_block(previous_hash=1, proof=100)
        # 基本的区块链可以接受交易和挖矿，但区块链系统应该是分布式的，一致性问题，一致性算法
        self.nodes = set()

    def proof_of_work(self, last_proof):
        """
        简单的PoW:
           - 找一个 p' 使得 hash(pp') 以4个0开头
           - p 是上一个块的证明， p' 是当前的证明
        衡量复杂度的办法是修改0开头的个数，使用4个来用于演示，会大大增大计算所需时间
        :param last_proof: <int>
        :return: <int>
        """
        proof = 0
        while self.valid_proof(last_proof, proof) is False:
            proof += 1
        return proof

    @staticmethod
    def valid_proof(last_proof, proof):
        """
        验证：是否hash(last_proof, proof)以4个0开头
        :param last_proof: <int> previous proof
        :param proof: <int> current proof
        :return: <bool> True if correct, False if not
        """
        guess = f'{last_proof}{proof}'.encode()
        guess_hash = hashlib.sha256(guess).hexdigest()
        return guess_hash[:4] == "0000"

    def new_block(self, proof, previous_hash=None):
        # 创建新块并添加到chain中
        # 当blockchain实例化后，我们需要构造一个创世快（没有前区块的第一个区块），并且给它加上一个工作量证明。
        # 每个全区块都需要经过工作量证明，称为挖矿
        """
        :param proof: 工作证明，pow algorithm
        :param previous_hash: hash of previous block
        :return:  <dict> new block
        """
        block = {
            'index': len(self.chain) + 1,
            'timestamp': time(),
            'transactions': self.current_transactions,
            'proof': proof,
            'previous_hash': previous_hash or self.hash(self.chain[-1]),
        }
        # reset current list of transactions
        self.current_transactions = []
        self.chain.append(block)
        return block

    @staticmethod
    def hash(block):
        # hash 一个block
        """
        生成块的 sha-256 hash 值
        :param block: <dict> block
        :return: <str>
        """
        block_string = json.dumps(block, sort_keys=True).encode()
        return hashlib.sha256(block_string).hexdigest()

    @property
    def last_block(self):
        # 返回chain中最后一个block
        return self.chain[-1]

    def new_transaction(self, sender, recipient, amount):
        """
        生成新交易信息，信息将加入到下一个待挖的区块中，等下再用户提交交易时会有用
        :param sender: address of the sender
        :param recipient: address of the recipient
        :param amount: amount
        :return: the index of the block that will hold this transaction
        """
        self.current_transactions.append({
            'sender': sender,
            'recipient': recipient,
            'amount': amount,
        })
        return self.last_block['index'] + 1

    def register_node(self, address):
        """
        add 新的node到list of nodes
        :param address: http://192.168.1.100:5000
        :return:
        """
        # set 来存储节点，避免添加节点的简单方法
        parsed_url = urlparse(address)
        self.nodes.add(parsed_url.netloc)

    def valid_chain(self, chain):
        """
        determine if a given blockchain is valid
        :param chain: <list> a blockchain
        :return: <bool> true if valid, false if not
        """
        last_block = chain[0]
        current_index = 1
        while current_index < len(chain):
            block = chain[current_index]
            print(f'{last_block}')
            print(f'{block}')
            print("\n--------------\n")
            # check that the hash of the block is correct
            if block['previous_hash'] != self.hash(last_block):
                return False
            # check that the proof
            if not self.valid_proof(last_block['proof'], block['proof']):
                return False
            last_block = block
            current_index += 1

        return True

    def resolve_conflicts(self):
        """
        共识算法解决冲突，使用网络中最长的链
        :return: True 如果链被取代，否则False
        """
        neighbours = self.nodes
        new_chain = None

        max_length = len(self.chain)

        for node in neighbours:
            response = request.get(f'http://{node}/chain')

            if response.status_code = 200:
                length = response.json()['length']
                chain = response.json()['chain']

                if length > max_length and self.valid_chain(chain):
                    max_length = length
                    new_chain = chain
        if new_chain:
            self.chain = new_chain
            return True

        return False

"""
PoW目标是找一个符合特定条件的数字，这个数字很难计算出来，但容易验证，这就是工作量证明的核心思想
from hashlib import sha256
x = 5
y = 0
while sha256(f'{x*y}'.encode().hexdigest()[-1] != "0":
    y += 1
print(f'the solution is y = {y}')
矿工算结果符合要求，计算难度与目标字符串需要满足的特定字符的数量成正比，网络上非常容易验证这个结果


发送到节点的交易数据结构
{
    "sender": "my address",
    "recipient": "another address",
    "amount": 5
}
"""

from flask import Flask, jsonify, request

# instantiate 节点
app = Flask(__name__)

# generate a globally unique address for this node
node_identifier = str(uuid4()).replace('-', '')

# instantiate the blockchain
blockchain = BlockChain()


@app.route('/mine', methods=['GET'])
def mine():
    # "we'll mine a new block"
    """
    完成三件事：
    1. 计算工作证明 PoW
    2. 通过新增一个交易给予矿工（自己）一个币
    3. 构造新区块并将其添加到链中
    :return:
    """
    last_block = blockchain.last_block
    last_proof = last_block['proof']
    proof = blockchain.proof_of_work(last_proof)

    # 给工作量证明的节点提供奖励
    # 发送者为“0”表示是新挖出的币
    blockchain.new_transaction(
        sender="0",
        recipient=node_identifier,
        amount=1,
    )
    # Forge the new Block by adding it to the chain
    block = blockchain.new_block(proof)

    response = {
        'message': "new block forged",
        'index': block['index'],
        'transactions': block['transactions'],
        'proof': block['proof'],
        'previous_hash': block['previous_hash'],
    }
    return jsonify(response), 200


@app.route('/transactions/new', methods=['POST'])
def new_transaction():
    # "we'll add a new transaction"
    values = request.get_json()
    print(values)
    # check that the required fields are in the post'ed data
    required = ['sender', 'recipient', 'amount']
    if not all(k in values for k in required):
        return 'missing values', 400

    # create a new transaction
    index = blockchain.new_transaction(values['sender'], values['recipient'], values['amount'])
    response = {'message': f'Transaction will be added to block {index}'}
    return jsonify(response), 201


@app.route('/chain', methods=['GET'])
def full_chain():
    response = {
        'chain': blockchain.chain,
        'length': len(blockchain.chain),
    }
    return jsonify(response), 200



@app.route('/nodes/register', methods=['POST'])
def register_nodes():
    values = request.get_json()

    nodes = values.get('nodes')
    if nodes is None:
        return "Error, please supply a valid list of nodes", 400

    for node in nodes:
        blockchain.register_node(node)
    response = {
        'message': 'new nodes have been added',
        'total_nodes': list(blockchain.nodes)
    }
    return jsonify(response), 201


@app.route('/nodes/resolve', methods=['GET'])
def consensus():
    replaced = blockchain.resolve_conflicts()
    if replaced:
        response = {
            'message': 'our chain was replaced',
            'new_chain': blockchain.chain
        }
    else:
        response = {
            'message': 'our chain is authoritative',
            'chain': blockchain.chain
        }
    return jsonify(response), 200
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)