import pytest
from v1.gitdrnk import gitdrnk


@pytest.fixture
def client():
    gitdrnk.config['TESTING'] = True
    client = gitdrnk.test_client()
    yield client


def test_health_check(client):
    rv = client.get('/health_check')
    print(rv.data)
    assert b'OK' in rv.data


def test_get_info(client):
    rv = client.get('/info')
    print(rv.data)
    assert b'OK' in rv.data


def test_offenses(client):
    test_user = 'testees'
    for offense, punishment in gitdrnk.config['RULE_SET'].items():
        punishment_info = client.get('/violation?offense=' + offense + '&user=' + test_user)
        assert str.encode(test_user) in punishment_info.data
        assert str.encode(punishment) in punishment_info.data


def test_board(client):
    rv = client.get('/board')
    for offense, punishment in gitdrnk.config['RULE_SET'].items():
        assert str.encode(offense) in rv.data
        assert str.encode(punishment) in rv.data


def test_installer_base(client):
    rv = client.get('/install')
    assert rv.data is not None


def test_installer_custom(client):
    test_user = 'LAMP_BROTHER'
    rv = client.get('/install?username=' + test_user)
    assert rv.data is not None
