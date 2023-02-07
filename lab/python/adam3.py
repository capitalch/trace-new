arr = [None]
arr1 = [item for item in arr if item is not None]
ret = 'select'
if(arr1.count != 0):
    ret = ','.join(str(i) for i in arr1)
ret1 = f'({ret})'
# ret = ''.join(arr)
print(ret1)

# new_lst = [item for item in lst if item is not None]